import { fetchAIResponse } from './aiClient';
import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export async function fetchJinaSummary(file: File): Promise<string> {
  try {
    console.log('Attempting to summarize PDF:', file.name);

    let extractedText = "";

    try {
      extractedText = await extractTextFromPDF(file);
      console.log('Extracted text preview:', extractedText.substring(0, 300));

      if (!extractedText || extractedText.length < 200) {
        throw new Error("Not enough readable text found in the PDF.");
      }

    } catch (pdfError) {
      console.error('PDF extraction error:', pdfError);
      throw new Error(`Could not extract text from PDF: ${pdfError.message || 'Unknown error'}`);
    }

    const truncatedText = extractedText.substring(0, 12000);
    const summaryPrompt = `Please provide a comprehensive and detailed summary of the following text extracted from a PDF document.

1. MAIN TOPICS: List 3-5 key topics covered
2. DETAILED SUMMARY: Provide a thorough summary with key points organized by section
3. KEY INSIGHTS: Highlight 3-5 most important takeaways

Use clear formatting, bullets, and subheadings for readability.

Here is the text to summarize:

${truncatedText}`;

    const summary = await fetchAIResponse(summaryPrompt);

    const cleanedSummary = summary.replace(/^\([^)]+\)\s➤\s/, 'Tutor AI: ');
    return cleanedSummary;

  } catch (error) {
    console.error('Error generating summary:', error);
    if (error.message.includes('readable text')) {
      return `⚠️ This PDF may be scanned or image-based and contains no readable text. Try another file.`;
    }
    return "⚠️ Error processing document. Please try again with a different PDF file.";
  }
}

// Improved PDF text extraction using PDF.js
async function extractTextFromPDF(file: File): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await Promise.race([
        pdfjs.getDocument({ data: arrayBuffer }).promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('PDF loading timeout')), 30000))
      ]) as pdfjs.PDFDocumentProxy;

      console.log(`PDF loaded with ${pdf.numPages} pages`);
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        try {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += pageText + '\n\n';
          if (pdf.numPages > 10 && i % 5 === 0) {
            console.log(`PDF extraction progress: ${i}/${pdf.numPages}`);
          }
        } catch (err) {
          console.warn(`Page ${i} extraction failed:`, err);
        }
      }

      const cleanedText = fullText
        .replace(/\s+/g, ' ')
        .replace(/(\n\s*){3,}/g, '\n\n')
        .replace(/([.!?])\s*(\n\s*)+/g, '$1\n\n')
        .replace(/[^\x00-\x7F]/g, '')
        .trim();

      resolve(cleanedText);

    } catch (err) {
      console.error('PDF extraction error:', err);
      reject(new Error(`PDF extraction failed: ${err.message || 'Unknown error'}`));
    }
  });
}

export async function checkPDFProcessable(file: File): Promise<{ processable: boolean; reason?: string }> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

    if (pdf.numPages === 0) return { processable: false, reason: "The PDF has no pages." };

    const firstPage = await pdf.getPage(1);
    const textContent = await firstPage.getTextContent();
    const hasText = textContent.items.some((item: any) => item.str.trim().length > 0);

    return hasText
      ? { processable: true }
      : { processable: false, reason: "No text found on the first page. PDF may be image-based." };

  } catch (err) {
    console.error('PDF check error:', err);
    return {
      processable: false,
      reason: err.message.includes("Password")
        ? "This PDF is password protected"
        : "This PDF cannot be processed"
    };
  }
}
