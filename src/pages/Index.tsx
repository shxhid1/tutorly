
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DocumentUploader from "@/components/features/DocumentUploader";
import StudyModes from "@/components/features/StudyModes";
import AITutor from "@/components/features/AITutor";
import ProgressDashboard from "@/components/features/ProgressDashboard";
import { Button } from "@/components/ui/button";
import { BookOpenText, Sparkles } from "lucide-react";

const Index = () => {
  const [showUploader, setShowUploader] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  const handleStartStudying = () => {
    setShowUploader(false);
    setShowContent(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-spark-gray">
      <Navbar />
      
      <main className="flex-1 container py-6 px-4">
        {showUploader && (
          <div className="mb-12">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-spark-light px-4 py-2 rounded-full mb-4">
                <Sparkles className="h-4 w-4 text-spark-primary" />
                <span className="text-sm font-medium text-spark-secondary">AI-Powered Learning</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Personal AI Study Companion</h1>
              <p className="text-muted-foreground text-lg mb-6">
                Upload any study material and let our AI create personalized learning resources for you
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button className="spark-button-primary" onClick={() => document.getElementById('file-upload')?.click()}>
                  Get Started
                </Button>
                <Button variant="outline" className="spark-button-secondary">
                  See Examples
                </Button>
              </div>
            </div>
            
            <DocumentUploader />
            
            <div className="mt-8 text-center">
              <Button 
                className="spark-button-primary"
                onClick={handleStartStudying}
              >
                <BookOpenText className="mr-2 h-4 w-4" />
                Start Studying (Demo)
              </Button>
            </div>
          </div>
        )}
        
        {showContent && (
          <div className="space-y-6">
            <ProgressDashboard />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StudyModes />
              <AITutor />
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
