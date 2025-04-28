
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import AITutor from "@/components/features/AITutor";

const Chat = () => {
  // Start in fullscreen by default
  const [isFullscreen, setIsFullscreen] = useState(true);
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 pb-20 md:pb-8">
        <div className="container max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">AI Study Tutor</h1>
          <p className="text-muted-foreground mb-8">
            Chat with your AI tutor about any topic in your study materials
          </p>
          
          <div className={`${isFullscreen ? 'fixed inset-0 z-50 p-4 bg-white dark:bg-background' : ''}`}>
            <AITutor isFullscreen={isFullscreen} toggleFullscreen={() => setIsFullscreen(!isFullscreen)} />
          </div>
        </div>
      </main>
      
      {!isFullscreen && (
        <>
          <Footer />
          <BottomNav />
        </>
      )}
    </div>
  );
};

export default Chat;
