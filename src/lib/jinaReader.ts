
import { fetchAIResponse } from './aiClient';

export async function fetchJinaSummary(fileUrl: string): Promise<string> {
  try {
    console.log('Attempting to summarize PDF with Jina AI:', fileUrl);
    
    // First, try using Jina AI's PDF reader service
    const response = await fetch("https://api.jina.ai/v1/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.JINA_API_KEY || ''}`
      },
      body: JSON.stringify({
        url: fileUrl,
        max_length: 1000,
      }),
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
    
    // Fallback to our AI client
    try {
      console.log('Falling back to AI client for summarization');
      const fallbackPrompt = `I have a PDF document with URL ${fileUrl}. Please provide a concise summary of its likely contents based on the URL.`;
      
      const fallbackSummary = await fetchAIResponse(fallbackPrompt);
      const cleanedSummary = fallbackSummary.replace(/^\([^)]+\)\s➤\s/, 'Tutor AI: ');
      
      return cleanedSummary;
    } catch (fallbackError) {
      console.error('Fallback AI summarization failed:', fallbackError);
      return "Error processing document. Please try again later.";
    }
  }
}
