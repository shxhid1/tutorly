
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
const pdfWorkerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

// Type definitions
interface PDFCheckResult {
  processable: boolean;
  reason?: string;
}

interface SummaryResponse {
  summary: string;
  fileDetails?: any;
}

// Check if PDF is processable
export const checkPDFProcessable = async (file: File): Promise<PDFCheckResult> => {
  try {
    // Create a buffer from the file
    const arrayBuffer = await file.arrayBuffer();
    
    // Try to load the PDF document
    const loadingTask = pdfjsLib.getDocument(arrayBuffer);
    const pdfDoc = await loadingTask.promise;
    
    // Check number of pages
    const numPages = pdfDoc.numPages;
    
    if (numPages === 0) {
      return {
        processable: false,
        reason: "PDF has no pages to process"
      };
    }
    
    // Check if we can extract text from the first page
    const page = await pdfDoc.getPage(1);
    const textContent = await page.getTextContent();
    
    if (!textContent.items.length) {
      return {
        processable: false,
        reason: "No text could be extracted from this PDF. It may be a scanned document or image-based PDF."
      };
    }
    
    return { processable: true };
  } catch (error) {
    console.error("Error checking PDF:", error);
    return {
      processable: false,
      reason: error instanceof Error ? error.message : "Unknown error checking PDF"
    };
  }
};

// Main function to extract text and get summary
export const fetchJinaSummary = async (file: File): Promise<string | SummaryResponse> => {
  try {
    // Extract text from PDF
    console.log("Starting text extraction from PDF");
    const text = await extractTextFromPDF(file);
    
    // Log a preview of the extracted text for debugging
    console.log("Extracted text preview:", text.substring(0, 300) + "...");
    
    if (!text || text.trim().length < 50) {
      return `Error: Could not extract sufficient text from the PDF. The document may be image-based or encrypted.`;
    }
    
    // Process with Jina API
    console.log("Getting summary from Jina API");
    const result = await getSummaryFromJina(text);
    return result;
  } catch (error) {
    console.error("Error in fetchJinaSummary:", error);
    return `Error: ${error instanceof Error ? error.message : "Unknown error processing PDF"}`;
  }
};

// Extract text from PDF
const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    
    let fullText = '';
    
    // Process each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      // Extract text items
      const textItems = textContent.items.map((item: any) => {
        return item.str;
      });
      
      fullText += textItems.join(' ') + '\n';
    }
    
    return fullText;
  } catch (error) {
    console.error("PDF text extraction error:", error);
    throw new Error(`Failed to extract text: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

// Get summary from Jina
const getSummaryFromJina = async (text: string): Promise<string | SummaryResponse> => {
  try {
    // Prepare a more structured prompt for better summaries
    const prompt = `
      Summarize the following text comprehensively. 
      Include key points, main ideas, and important details.
      Present the summary in a well-structured format with clear paragraphs.
      
      Text to summarize:
      ${text.substring(0, 10000)}
    `;
    
    // Mock implementation - replace with actual API call
    // This is a placeholder - in a real implementation, you would call the Jina API here
    console.log("Calling summary API with text length:", text.length);
    
    // Simulated API response - in reality you would get this from the API
    return {
      summary: "This is a placeholder summary. In a real implementation, this would be replaced with the actual summary from the Jina AI API. The summary would include key points from the document, main ideas expressed by the author, and any important details that should be highlighted. The summary would be well-structured with clear paragraphs for readability."
    };
  } catch (error) {
    console.error("Summary API error:", error);
    throw new Error(`Failed to generate summary: ${error instanceof Error ? error.message : "Unknown API error"}`);
  }
};
