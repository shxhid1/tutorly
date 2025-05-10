
export async function fetchJinaSummary(fileUrl: string): Promise<string> {
  try {
    const response = await fetch("https://api.jina.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_JINA_API_KEY}`
      },
      body: JSON.stringify({
        model: "jina-embed-v2",
        messages: [
          {
            role: "user",
            content: `Summarize this PDF document: ${fileUrl}`
          }
        ],
        max_tokens: 500
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No summary found.";
  } catch (error) {
    console.error(error);
    return "Error reading PDF with Jina AI.";
  }
}
