import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText, FileText, Plus, Clock, Upload, X, FileIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { fetchJinaSummary } from "@/lib/jinaReader";
import { useTheme } from "@/contexts/ThemeContext";

const Summaries = () => {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [summaryResult, setSummaryResult] = useState<string | null>(null);
  const { toast } = useToast();
  const { theme } = useTheme();
  
  const summaries = [
    { 
      id: 1, 
      title: "Cell Structure and Function", 
      description: "Overview of eukaryotic and prokaryotic cell structures and their functions",
      type: "quick",
      created: "2 days ago",
      readTime: "5 min read"
    },
    { 
      id: 2, 
      title: "Photosynthesis Process", 
      description: "Detailed explanation of the light-dependent and light-independent reactions",
      type: "deep",
      created: "1 week ago",
      readTime: "15 min read"
    },
    { 
      id: 3, 
      title: "Periodic Table Elements", 
      description: "Summary of element groups, periods, and their properties",
      type: "quick",
      created: "3 days ago",
      readTime: "7 min read"
    },
    { 
      id: 4, 
      title: "Chemical Bonding", 
      description: "Comprehensive guide to ionic, covalent, and metallic bonds",
      type: "deep",
      created: "2 weeks ago",
      readTime: "20 min read"
    },
    { 
      id: 5, 
      title: "World War II Timeline", 
      description: "Chronological events of WWII from 1939-1945",
      type: "quick",
      created: "5 days ago",
      readTime: "8 min read"
    },
    { 
      id: 6, 
      title: "Renaissance Art and Culture", 
      description: "Analysis of major Renaissance artists, works, and cultural impacts",
      type: "deep",
      created: "3 weeks ago",
      readTime: "25 min read"
    }
  ];
  
  const summaryTypes = {
    quick: { label: "Quick Recap", bg: "bg-spark-blue dark:bg-blue-800", icon: ScrollText },
    deep: { label: "Deep Dive", bg: "bg-spark-peach dark:bg-orange-800", icon: FileText }
  };
  
  const handleGenerateSummary = () => {
    setShowUploadDialog(true);
    setSummaryResult(null);
    setSelectedFile(null);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async (e?: React.FormEvent) => {
    // Prevent default form submission if event is provided
    if (e) e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate initial upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 5;
      });
    }, 150);
    
    try {
      // Process PDF and generate summary directly
      console.log("Starting summary generation for:", selectedFile.name);
      const summary = await fetchJinaSummary(selectedFile);
      console.log("Summary result:", summary);
      
      // Complete the progress
      clearInterval(interval);
      setUploadProgress(100);
      
      // Set the summary result and keep dialog open
      setSummaryResult(summary);
      
      // Show success toast
      toast({
        title: "Summary generated",
        description: "Your document has been processed successfully"
      });
    } catch (error) {
      console.error("Error generating summary:", error);
      clearInterval(interval);
      setUploadProgress(0);
      
      toast({
        title: "Error processing document",
        description: "Could not process your PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 pb-20 md:pb-8 text-gray-800 dark:text-white">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-white">Smart Summaries</h1>
              <p className="text-gray-700 dark:text-gray-200">Get condensed versions of your material in different formats</p>
            </div>
            <Button 
              className="bg-primary text-white button-click-effect"
              onClick={handleGenerateSummary}
            >
              <Plus className="mr-2 h-4 w-4" /> Generate New Summary
            </Button>
          </div>
          
          {/* Grid of summaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaries.map(summary => {
              const type = summaryTypes[summary.type as keyof typeof summaryTypes];
              const Icon = type.icon;
              
              return (
                <Card key={summary.id} className="hover-glow hover-lift transition-all duration-300 h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader className={cn("rounded-t-lg", type.bg)}>
                    <div className="flex justify-between items-center">
                      <div className="bg-white/20 p-2 rounded-full">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs font-medium px-2 py-1 bg-white/30 rounded-full text-white">
                        {type.label}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardTitle className="text-lg mb-2 text-gray-800 dark:text-white">{summary.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mb-4 text-gray-700 dark:text-gray-200">{summary.description}</CardDescription>
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                      <span>{summary.created}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{summary.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {summaries.length === 0 && (
            <div className="text-center py-12 bg-muted rounded-lg">
              <ScrollText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-white">No summaries yet</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Upload study material to generate smart summaries.
              </p>
              <Button className="bg-primary text-white button-click-effect" onClick={handleGenerateSummary}>
                <Plus className="mr-2 h-4 w-4" /> Create Your First Summary
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <BottomNav />
      
      {/* File Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={(open) => {
        if (!isUploading) setShowUploadDialog(open);
      }}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-white">Upload Document for Summary</DialogTitle>
            <DialogDescription className="text-gray-700 dark:text-gray-200">
              Upload your study material to generate a smart summary
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {!summaryResult && (
              <form onSubmit={handleUpload} className="space-y-4">
                <div className={`relative border-2 border-dashed rounded-lg p-6 text-center ${selectedFile ? 'bg-muted border-primary/20' : 'border-muted-foreground/25'}`}>
                  {selectedFile ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileIcon className="h-8 w-8 text-muted-foreground" />
                        <div className="space-y-1 text-left">
                          <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedFile.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedFile(null)}
                        className="text-gray-800 dark:text-white"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="rounded-full bg-muted p-2">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-800 dark:text-white">Drag & drop or click to upload</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          PDF, Word, or Text files (max 20MB)
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt"
                    disabled={isUploading}
                  />
                </div>
                
                {isUploading && (
                  <div className="space-y-2">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-center text-gray-600 dark:text-gray-300">
                      {uploadProgress < 100 ? 'Processing document...' : 'Generating summary...'}
                    </p>
                  </div>
                )}
              </form>
            )}
            
            {summaryResult && (
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mt-4 max-h-[400px] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Generated Summary</h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">
                    {summaryResult}
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowUploadDialog(false);
                  setSummaryResult(null);
                  setSelectedFile(null);
                  setIsUploading(false);
                }} 
                disabled={isUploading}
                className="text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                type="button"
              >
                {summaryResult ? "Close" : "Cancel"}
              </Button>
              
              {!summaryResult && (
                <Button 
                  className="bg-primary text-white"
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                  type="button"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : 'Generate Summary'}
                </Button>
              )}
              
              {summaryResult && (
                <Button 
                  className="bg-primary text-white"
                  onClick={() => {
                    // Save or export summary functionality could be added here
                    toast({
                      title: "Summary saved",
                      description: "Summary has been saved to your library"
                    });
                    setShowUploadDialog(false);
                    setSummaryResult(null);
                  }}
                  type="button"
                >
                  Save Summary
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Summaries;
