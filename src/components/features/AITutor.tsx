
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, BrainCircuit, MessageSquare, RefreshCw, Send, Sparkles, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const AITutor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI Study Tutor. How can I help you understand your material better today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setIsThinking(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsThinking(false);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "I'd be happy to explain that! The concept you're asking about relates to cellular respiration, which is how cells convert nutrients into energy. Would you like me to provide more details, examples, or perhaps quiz you on this topic?"
        }
      ]);
    }, 1500);
  };
  
  return (
    <Card className="w-full h-[500px] flex flex-col">
      <CardHeader className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-spark-primary" />
            <CardTitle className="text-base font-medium">AI Study Tutor</CardTitle>
          </div>
          <Tabs defaultValue="chat" className="w-auto">
            <TabsList className="h-8 p-1">
              <TabsTrigger value="chat" className="text-xs px-2 py-1 h-6">
                <MessageSquare className="h-3 w-3 mr-1" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="quiz" className="text-xs px-2 py-1 h-6">
                <BookOpen className="h-3 w-3 mr-1" />
                Quiz Me
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-4 overflow-y-auto flex-1">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] px-4 py-2 rounded-xl ${
                  message.role === "user" 
                    ? "bg-spark-primary text-white rounded-br-none"
                    : "bg-spark-light text-foreground rounded-bl-none"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-4 py-2 bg-spark-light rounded-xl rounded-bl-none flex items-center gap-2">
                <div className="w-2 h-2 bg-spark-secondary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-spark-secondary rounded-full animate-pulse delay-150"></div>
                <div className="w-2 h-2 bg-spark-secondary rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t">
        <div className="flex items-center gap-2 w-full">
          <Button variant="outline" size="icon" className="shrink-0">
            <Sparkles className="h-4 w-4 text-spark-primary" />
          </Button>
          <div className="flex items-center w-full relative">
            <input
              type="text"
              placeholder="Ask anything about your material..."
              className="w-full rounded-full border border-spark-light pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-spark-primary"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button 
              size="icon" 
              className="absolute right-1 bg-spark-primary text-white hover:bg-spark-secondary rounded-full h-7 w-7"
              onClick={handleSendMessage}
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AITutor;
