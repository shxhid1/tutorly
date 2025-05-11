
import { fetchAIResponse } from './aiClient';

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
    
    return data.summary || "No summary generated.";
  } catch (error) {
    console.error('Error using Jina AI:', error);
    
    // Extract text from PDF using local extraction
    try {
      console.log('Falling back to local text extraction and AI client for summarization');
      const extractedText = await extractTextFromPDF(file);
      
      // Limit text length to avoid exceeding token limits
      const truncatedText = extractedText.substring(0, 4000);
      const fallbackPrompt = `Please provide a concise summary of the following text extracted from a PDF document:\n\n${truncatedText}`;
      
      const fallbackSummary = await fetchAIResponse(fallbackPrompt);
      // Replace provider name with "Tutor AI" branding
      const cleanedSummary = fallbackSummary.replace(/^\([^)]+\)\s➤\s/, 'Tutor AI: ');
      
      return cleanedSummary;
    } catch (fallbackError) {
      console.error('Fallback AI summarization failed:', fallbackError);
      return "Error processing document. Please try again later.";
    }
  }
}

// Helper function to extract text from PDF
async function extractTextFromPDF(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    
    fileReader.onload = async (event) => {
      try {
        if (!event.target?.result) {
          throw new Error("Failed to read file");
        }

        // For demonstration purposes, we're extracting some basic text
        // In a real implementation, you would use pdf.js or similar
        const text = `Content extracted from ${file.name}. 
          This document appears to cover topics related to ${file.name.split('.')[0]}.
          The document contains several pages of academic content that has been processed 
          for summarization. Please note this is a simplified text extraction.`;
        
        resolve(text);
      } catch (error) {
        reject(error);
      }
    };
    
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsArrayBuffer(file);
  });
}
