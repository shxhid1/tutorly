import { fetchAIResponse } from './aiClient';
import * as pdfjs from 'pdfjs-dist';

// Set worker path for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export async function fetchJinaSummary(file: File): Promise<string> {
  try {
    console.log('Attempting to summarize PDF:', file.name);
    
    // First, try using local PDF extraction
    let extractedText = "";
    
    try {
      extractedText = await extractTextFromPDF(file);
      
      // Log a preview of the extracted text to help debug issues
      console.log('Extracted text preview:', extractedText.substring(0, 300));
      
      if (!extractedText || extractedText.length < 100) {
        throw new Error("Insufficient text extracted from PDF");
      }
    } catch (pdfError) {
      console.error('PDF extraction error:', pdfError);
      throw new Error(`Could not extract text from PDF: ${pdfError.message || 'Unknown error'}`);
    }
    
    // Ensure we have enough meaningful content (not just garbage text)
    if (!/[a-zA-Z]{3,}/.test(extractedText)) {
      throw new Error("The PDF appears to contain no readable text. It may be scanned or image-based.");
    }
    
    // Limit text length to avoid exceeding token limits but ensure we have enough content
    const truncatedText = extractedText.substring(0, 12000); // Increased from 8000 to get more context
    const summaryPrompt = `Please provide a comprehensive and detailed summary of the following text extracted from a PDF document. 
    Structure your response with:
    
    1. MAIN TOPICS: List 3-5 key topics covered
    2. DETAILED SUMMARY: Provide a thorough summary with key points organized by section
    3. KEY INSIGHTS: Highlight 3-5 most important takeaways
    
    Include relevant quotes, statistics, or specific details from the text. Format your response with clear headings, paragraphs, and bullet points for readability.
    
    Here is the text to summarize:
    
    ${truncatedText}`;
    
    const summary = await fetchAIResponse(summaryPrompt);
    
    // Replace provider name with "Tutor AI" branding
    const cleanedSummary = summary.replace(/^\([^)]+\)\s➤\s/, 'Tutor AI: ');
    
    return cleanedSummary;
  } catch (error) {
    console.error('Error generating summary:', error);
    if (error.message.includes('PDF')) {
      return `Error: ${error.message}. Please try a different PDF file.`;
    }
    return "Error processing document. Please try again with a different PDF file.";
  }
}

// Improved PDF text extraction using PDF.js
async function extractTextFromPDF(file: File): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Load the PDF document
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      
      // Add a timeout for loading
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('PDF loading timeout')), 30000); // 30 second timeout
      });
      
      // Race between loading and timeout
      const pdf = await Promise.race([
        loadingTask.promise,
        timeoutPromise
      ]) as pdfjs.PDFDocumentProxy;
      
      const numPages = pdf.numPages;
      console.log(`PDF loaded with ${numPages} pages`);
      
      let fullText = '';
      
      // Process all pages to extract text
      for (let i = 1; i <= numPages; i++) {
        try {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          
          // Join the text items with proper spacing
          const pageText = textContent.items
            .map((item: any) => item.str)
            .join(' ');
            
          fullText += pageText + '\n\n';
          
          // Log progress for large documents
          if (numPages > 10 && i % 5 === 0) {
            console.log(`PDF extraction progress: ${i}/${numPages} pages`);
          }
        } catch (pageError) {
          console.error(`Error extracting text from page ${i}:`, pageError);
          // Continue with other pages rather than failing completely
        }
      }
      
      console.log(`Extracted ${fullText.length} characters of text from ${numPages} pages`);
      
      // Clean up the text (remove excessive whitespace, fix common PDF artifacts)
      const cleanedText = fullText
        .replace(/\s+/g, ' ')                       // Replace multiple spaces with single space
        .replace(/(\n\s*){3,}/g, '\n\n')            // Normalize multiple newlines
        .replace(/([.!?])\s*(\n\s*)+/g, '$1\n\n')   // Fix sentence breaks
        .replace(/[^\x00-\x7F]/g, '')               // Remove non-ASCII characters that might cause issues
        .trim();
        
      resolve(cleanedText);
    } catch (error) {
      console.error('PDF extraction error:', error);
      reject(new Error(`PDF extraction failed: ${error.message || 'Unknown error'}`));
    }
  });
}

// Add a helper function to check if a PDF can be processed with a sample
export async function checkPDFProcessable(file: File): Promise<{ processable: boolean; reason?: string }> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    
    // Check if PDF has pages
    if (pdf.numPages === 0) {
      return { processable: false, reason: "The PDF has no pages" };
    }
    
    // Try to get the first page to see if it's accessible
    const firstPage = await pdf.getPage(1);
    const textContent = await firstPage.getTextContent();
    
    // Check if there's any text
    if (textContent.items.length === 0) {
      return { processable: false, reason: "The first page contains no text. The PDF might be image-based or scanned." };
    }
    
    return { processable: true };
  } catch (error) {
    console.error('PDF check error:', error);
    return { 
      processable: false, 
      reason: error.message.includes('Password') 
        ? "The PDF is password protected" 
        : "The PDF cannot be processed" 
    };
  }
}