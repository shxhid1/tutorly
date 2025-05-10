
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchAIResponse } from "@/lib/aiClient";
import { Loader2 } from "lucide-react";

const AIChat = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResponse("Thinking...");
    
    try {
      const result = await fetchAIResponse(prompt);
      setResponse(result);
    } catch (error) {
      console.error(error);
      setResponse("❌ Error: Failed to get AI response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto hover-glow">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">AI Assistant</CardTitle>
        <CardDescription className="text-center">Ask any question about your study materials</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 spark-input"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="spark-button-primary button-click-effect" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Ask AI'
              )}
            </Button>
          </div>
        </form>
        
        {response && (
          <div className="mt-6 p-4 bg-spark-gray rounded-lg dark:bg-muted">
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        <p>Using advanced AI to assist with your learning needs</p>
      </CardFooter>
    </Card>
  );
};

export default AIChat;
