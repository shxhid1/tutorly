
import { fetchAIResponse } from './aiClient';
import * as pdfjs from 'pdfjs-dist';

// Set worker path for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export async function fetchJinaSummary(file: File): Promise<string> {
  try {
    console.log('Attempting to summarize PDF with Jina AI:', file.name);
    
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);
    
    // First, try using Jina AI's PDF reader service
    const response = await fetch("https://api.jina.ai/v1/summarize", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_JINA_API_KEY || ''}`
      },
      body: formData,
    });
    
    if (!response.ok) {
      console.log('Jina API returned error:', response.status, response.statusText);
      throw new Error(`Jina API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Jina AI summary response:', data);
    
    if (data.summary && data.summary.length > 100) {
      return data.summary || "No summary generated.";
    } else {
      console.log('Jina summary was too short or empty, falling back to local extraction');
      throw new Error('Summary too short');
    }
  } catch (error) {
    console.error('Error using Jina AI:', error);
    
    // Extract text from PDF using PDF.js and then summarize with AI client
    try {
      console.log('Falling back to PDF.js extraction and AI client for summarization');
      const extractedText = await extractTextFromPDF(file);
      
      if (!extractedText || extractedText.length < 100) {
        throw new Error("Insufficient text extracted from PDF");
      }
      
      // Limit text length to avoid exceeding token limits but ensure we have enough content
      const truncatedText = extractedText.substring(0, 8000);
      const fallbackPrompt = `Please provide a comprehensive and detailed summary of the following text extracted from a PDF document. 
      Include key points, main topics, and important conclusions. Structure your summary with paragraphs and bullet points where appropriate:

      ${truncatedText}`;
      
      const fallbackSummary = await fetchAIResponse(fallbackPrompt);
      // Replace provider name with "Tutor AI" branding
      const cleanedSummary = fallbackSummary.replace(/^\([^)]+\)\s➤\s/, 'Tutor AI: ');
      
      return cleanedSummary;
    } catch (fallbackError) {
      console.error('Fallback AI summarization failed:', fallbackError);
      return "Error processing document. Please try again with a different PDF file.";
    }
  }
}

// Improved PDF text extraction using PDF.js
async function extractTextFromPDF(file: File): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      console.log(`PDF loaded with ${numPages} pages`);
      
      let fullText = '';
      
      // Process all pages to extract text
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Join the text items with proper spacing
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
          
        fullText += pageText + '\n\n';
      }
      
      console.log(`Extracted ${fullText.length} characters of text`);
      
      // Clean up the text (remove excessive whitespace, fix common PDF artifacts)
      const cleanedText = fullText
        .replace(/\s+/g, ' ')                       // Replace multiple spaces with single space
        .replace(/(\n\s*){3,}/g, '\n\n')            // Normalize multiple newlines
        .replace(/([.!?])\s*(\n\s*)+/g, '$1\n\n')   // Fix sentence breaks
        .trim();
        
      resolve(cleanedText);
    } catch (error) {
      console.error('PDF extraction error:', error);
      reject(error);
    }
  });
}
