
export async function fetchAIResponse(prompt: string): Promise<string> {
  const providers = [
    { name: "OpenRouter", url: "https://openrouter.ai/api/v1/chat/completions", key: import.meta.env.VITE_OPENROUTER_API_KEY },
    { name: "Groq", url: "https://api.groq.com/openai/v1/chat/completions", key: import.meta.env.VITE_GROQ_API_KEY },
    { name: "Together", url: "https://api.together.xyz/v1/chat/completions", key: import.meta.env.VITE_TOGETHER_API_KEY },
    { name: "Claude", url: "https://api.anthropic.com/v1/messages", key: import.meta.env.VITE_CLAUDE_API_KEY },
    { name: "HuggingFace", url: "https://api-inference.huggingface.co/models/tiiuae/falcon-7b", key: import.meta.env.VITE_HUGGINGFACE_API_KEY }
  ];

  // Filter out providers without API keys
  const availableProviders = providers.filter(provider => provider.key);
  
  if (availableProviders.length === 0) {
    console.error("No API keys found. Please configure at least one AI provider API key.");
    return "⚠️ No AI providers configured. Please add API keys in your environment variables.";
  }

  // Track failed providers for better error reporting
  const failedProviders = [];

  for (const provider of availableProviders) {
    try {
      console.log(`Trying ${provider.name} for generating summary...`);
      
      // For summarization, we need more tokens - increased for better summaries
      const maxTokens = prompt.length > 5000 ? 2000 : 1000; 
      
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
        
        if (text === "No response" || text.length < 50) {
          console.warn(`${provider.name} returned an empty or very short response.`);
          failedProviders.push(`${provider.name} (empty response)`);
          continue;  // Try the next provider
        }
        
        console.log(`${provider.name} successfully generated a response of length: ${text.length}`);
        // Return with "Tutor AI" branding instead of provider name
        return `Tutor AI: ${text}`;
      } else {
        const errorText = await res.text();
        console.error(`${provider.name} API error (${res.status}):`, errorText);
        failedProviders.push(`${provider.name} (HTTP ${res.status})`);
      }
    } catch (e) {
      console.error(`${provider.name} failed: ${(e as Error).message}.`);
      failedProviders.push(provider.name);
    }
    
    console.log("Trying next provider...");
  }

  // All providers failed, give detailed error
  console.error("All AI providers failed:", failedProviders.join(", "));
  return `❌ All AI providers failed (${failedProviders.join(", ")}). Please check your API keys or try again later.`;
}
