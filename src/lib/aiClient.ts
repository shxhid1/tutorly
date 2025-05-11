
export async function fetchAIResponse(prompt: string): Promise<string> {
  const providers = [
    { name: "OpenRouter", url: "https://openrouter.ai/api/v1/chat/completions", key: import.meta.env.VITE_OPENROUTER_API_KEY },
    { name: "Groq", url: "https://api.groq.com/openai/v1/chat/completions", key: import.meta.env.VITE_GROQ_API_KEY },
    { name: "Together", url: "https://api.together.xyz/v1/chat/completions", key: import.meta.env.VITE_TOGETHER_API_KEY },
    { name: "Claude", url: "https://api.anthropic.com/v1/messages", key: import.meta.env.VITE_CLAUDE_API_KEY },
    { name: "HuggingFace", url: "https://api-inference.huggingface.co/models/tiiuae/falcon-7b", key: import.meta.env.VITE_HUGGINGFACE_API_KEY }
  ];

  for (const provider of providers) {
    try {
      if (!provider.key) {
        console.log(`Skipping ${provider.name} - No API key found`);
        continue;
      }
      
      // For summarization, we need more tokens
      const maxTokens = prompt.length > 1000 ? 1000 : 500; 
      
      const res = await fetch(provider.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${provider.key}`,
          ...(provider.name === "Claude" && { "x-api-key": provider.key }),
          ...(provider.name === "Claude" && { "anthropic-version": "2023-06-01" }),
        },
        body: JSON.stringify(
          provider.name === "Claude" 
            ? {
                model: "claude-3-opus-20240229",
                messages: [{ role: "user", content: prompt }],
                max_tokens: maxTokens,
              }
            : {
                model: provider.name === "OpenRouter" ? "openai/gpt-3.5-turbo" : "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                max_tokens: maxTokens,
              }
        ),
      });

      if (res.ok) {
        const data = await res.json();
        const text =
          provider.name === "Claude"
            ? data?.content?.[0]?.text || "No response"
            : data?.choices?.[0]?.message?.content || "No response";
        // Return with "Tutor AI" branding instead of provider name
        return `Tutor AI: ${text}`;
      }
    } catch (e) {
      console.log(`${provider.name} failed: ${(e as Error).message}. Trying next...`);
    }
  }

  return "❌ All AI providers failed. Try again later.";
}
