
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Helmet } from "react-helmet";
import AIChat from "@/components/features/AIChat";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentUploader from "@/components/features/DocumentUploader";

const AIAssistant = () => {
  return (
    <>
      <Helmet>
        <title>AI Assistant | Tutorly</title>
      </Helmet>
      
      <Navbar />
      
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">AI Learning Assistant</h1>
        
        <Tabs defaultValue="chat" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
            <TabsTrigger value="upload">Upload Document</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-0">
            <AIChat />
          </TabsContent>
          
          <TabsContent value="upload" className="mt-0">
            <DocumentUploader />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default AIAssistant;
