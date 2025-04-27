
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileIcon, ImageIcon, FileTextIcon, LinkIcon, UploadIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DocumentUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [text, setText] = useState("");
  const { toast } = useToast();
  
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setIsUploading(true);
    
    // Simulate file upload and processing
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Document uploaded successfully!",
        description: "We're analyzing your document to create your personalized study materials.",
      });
    }, 1500);
  };
  
  const handleTextSubmit = () => {
    if (!text) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter some text to analyze.",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Text submitted successfully!",
        description: "We're analyzing your text to create your personalized study materials.",
      });
      setText("");
    }, 1000);
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">Upload Your Study Material</CardTitle>
        <CardDescription className="text-center">Import your documents, images, or paste text to start learning</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="file" className="flex items-center gap-2">
              <FileIcon className="h-4 w-4" />
              <span className="hidden sm:inline">File</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Image</span>
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-2">
              <FileTextIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Text</span>
            </TabsTrigger>
            <TabsTrigger value="url" className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              <span className="hidden sm:inline">URL</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="file">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-spark-light rounded-xl p-8 bg-spark-gray">
              <FileIcon className="w-10 h-10 text-spark-secondary mb-4" />
              <p className="text-center mb-4">Drag and drop your PDF or document file here, or click to browse</p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleUploadFile}
              />
              <Button 
                onClick={() => document.getElementById('file-upload')?.click()}
                className="spark-button-primary flex items-center gap-2"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 
                  <>
                    <UploadIcon className="h-4 w-4" />
                    Upload Document
                  </>
                }
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="image">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-spark-light rounded-xl p-8 bg-spark-gray">
              <ImageIcon className="w-10 h-10 text-spark-secondary mb-4" />
              <p className="text-center mb-4">Drag and drop your image here, or click to browse</p>
              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                onChange={handleUploadFile}
              />
              <Button 
                onClick={() => document.getElementById('image-upload')?.click()}
                className="spark-button-primary flex items-center gap-2"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 
                  <>
                    <UploadIcon className="h-4 w-4" />
                    Upload Image
                  </>
                }
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="text">
            <div className="flex flex-col">
              <textarea
                className="w-full h-40 border border-spark-light rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-spark-primary"
                placeholder="Paste your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button 
                className="spark-button-primary self-end"
                onClick={handleTextSubmit}
                disabled={isUploading}
              >
                {isUploading ? 'Processing...' : 'Analyze Text'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="url">
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  className="flex-1 spark-input"
                  placeholder="Enter an article or webpage URL..."
                />
                <Button className="spark-button-primary">
                  Import
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-center text-sm text-muted-foreground">
        Supports PDF, Word, Text files, Images (PNG, JPG), and URL imports
      </CardFooter>
    </Card>
  );
};

export default DocumentUploader;
