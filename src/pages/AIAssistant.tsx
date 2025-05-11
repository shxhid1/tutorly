
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import AIChat from "@/components/features/AIChat";

const AIAssistant = () => {
  // Update document title on component mount
  useEffect(() => {
    document.title = "AI Assistant | Tutorly";
    // Restore original title when component unmounts
    return () => {
      document.title = "Tutorly - Smart Learning Platform";
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <main className="container py-8 text-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">AI Learning Assistant</h1>
        <AIChat />
      </main>
    </div>
  );
};

export default AIAssistant;
