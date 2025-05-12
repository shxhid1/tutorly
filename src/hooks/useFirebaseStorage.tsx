
import { useState } from "react";
import { uploadFile, getFileURL, deleteFile, listUserFiles } from "@/lib/storage";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export const useFirebaseStorage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const handleUpload = async (file: File, folder: string = "files") => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to upload files",
        variant: "destructive",
      });
      return null;
    }

    try {
      setIsUploading(true);
      setProgress(0);

      // Simulate progress (since Firebase storage doesn't provide progress)
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const nextProgress = prev + 10;
          return nextProgress >= 90 ? 90 : nextProgress;
        });
      }, 300);

      const fileDetails = await uploadFile(currentUser.uid, file, folder);
      
      clearInterval(progressInterval);
      setProgress(100);

      toast({
        title: "Upload complete",
        description: `${file.name} has been uploaded successfully.`,
      });

      return fileDetails;
    } catch (error) {
      console.error("File upload error:", error);
      toast({
        title: "Upload failed",
        description: `Failed to upload ${file.name}. Please try again.`,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const getUserFiles = async (folder: string = "files") => {
    if (!currentUser) return [];

    try {
      return await listUserFiles(currentUser.uid, folder);
    } catch (error) {
      console.error("Error listing files:", error);
      toast({
        title: "Error",
        description: "Could not retrieve your files. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  };

  const removeFile = async (filePath: string) => {
    try {
      await deleteFile(filePath);
      toast({
        title: "File deleted",
        description: "The file has been removed successfully.",
      });
      return true;
    } catch (error) {
      console.error("File deletion error:", error);
      toast({
        title: "Deletion failed",
        description: "Could not delete the file. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    uploadFile: handleUpload,
    getFileURL,
    deleteFile: removeFile,
    listUserFiles: getUserFiles,
    isUploading,
    progress,
  };
};
