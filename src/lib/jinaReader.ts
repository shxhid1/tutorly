
import * as pdfjsLib from 'pdfjs-dist';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

// Configure PDF.js worker properly
import { GlobalWorkerOptions } from 'pdfjs-dist';
// Using the correct import format for the worker
import 'pdfjs-dist/build/pdf.worker.entry';

// Set the worker source correctly - we don't need to assign it as the import statement above registers the worker
GlobalWorkerOptions.workerSrc = pdfjsLib.GlobalWorkerOptions.workerSrc;

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

// Store summary in Firestore
export const storeSummary = async (userId: string, summary: string, fileName: string, fileUrl: string) => {
  try {
    const summaryCollection = collection(db, 'summaries');
    const docRef = await addDoc(summaryCollection, {
      userId,
      summary,
      fileName,
      fileUrl,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error storing summary:", error);
    throw error;
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
const getSummaryFromJina = async (text: string): Promise<SummaryResponse> => {
  try {
    // Prepare a more structured prompt for better summaries
    const prompt = `
      Summarize the following text comprehensively. 
      Include key points, main ideas, and important details.
      Present the summary in a well-structured format with clear paragraphs.
      
      Text to summarize:
      ${text.substring(0, 10000)}
    `;
    
    // Implement actual API call to Jina AI
    const apiUrl = 'https://api.jina.ai/v1/chat/completions';
    
    try {
      // Try to make a real API call to Jina
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.JINA_API_KEY || ''}`
        },
        body: JSON.stringify({
          model: 'jina-summary-model',  // Replace with actual model name
          messages: [
            { role: 'system', content: 'You are a helpful summarization assistant.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.3,
          max_tokens: 1000
        }),
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(15000)
      });
      
      if (response.ok) {
        const data = await response.json();
        return {
          summary: data.choices[0].message.content,
        };
      } else {
        // If API call fails, use fallback summarization
        console.error("Jina API request failed, using fallback summary");
        return getFallbackSummary(text);
      }
    } catch (error) {
      console.error("Error calling Jina API, using fallback:", error);
      return getFallbackSummary(text);
    }
  } catch (error) {
    console.error("Summary API error:", error);
    throw new Error(`Failed to generate summary: ${error instanceof Error ? error.message : "Unknown API error"}`);
  }
};

// Fallback summarization function
export const getFallbackSummary = (text: string): SummaryResponse => {
  // Split text into sentences
  const sentences = text
    .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
    .split("|")
    .filter(sentence => sentence.trim().length > 20); // Filter out very short sentences
  
  // Select representative sentences for the summary
  const summaryLength = Math.min(10, Math.ceil(sentences.length / 5));
  const step = Math.max(1, Math.floor(sentences.length / summaryLength));
  
  let selectedSentences = [];
  for (let i = 0; i < sentences.length && selectedSentences.length < summaryLength; i += step) {
    if (sentences[i] && sentences[i].length > 30) { // Ensure sentence is substantial
      selectedSentences.push(sentences[i]);
    }
  }
  
  // If we don't have enough sentences, add more from the beginning
  if (selectedSentences.length < summaryLength && sentences.length > summaryLength) {
    for (let i = 0; i < sentences.length && selectedSentences.length < summaryLength; i++) {
      if (!selectedSentences.includes(sentences[i])) {
        selectedSentences.push(sentences[i]);
      }
    }
  }
  
  // Create the fallback summary
  const summary = "Summary (generated offline):\n\n" + selectedSentences.join(' ');
  
  return { summary };
};
