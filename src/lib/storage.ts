
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll
} from "firebase/storage";
import { app } from "./firebase";

const storage = getStorage(app);

// Upload file to Firebase Storage
export const uploadFile = async (userId: string, file: File, folder: string = "files") => {
  try {
    const timestamp = Date.now();
    const fileName = `${userId}/${folder}/${timestamp}_${file.name}`;
    const storageRef = ref(storage, fileName);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      fileName,
      fileUrl: downloadURL,
      contentType: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Get file download URL
export const getFileURL = async (filePath: string) => {
  try {
    const fileRef = ref(storage, filePath);
    return await getDownloadURL(fileRef);
  } catch (error) {
    console.error("Error getting file URL:", error);
    throw error;
  }
};

// Delete file from storage
export const deleteFile = async (filePath: string) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

// List user files in a folder
export const listUserFiles = async (userId: string, folder: string = "files") => {
  try {
    const folderRef = ref(storage, `${userId}/${folder}`);
    const fileList = await listAll(folderRef);
    
    const fileDetailsPromises = fileList.items.map(async (fileRef) => {
      const url = await getDownloadURL(fileRef);
      return {
        name: fileRef.name,
        fullPath: fileRef.fullPath,
        url
      };
    });
    
    return await Promise.all(fileDetailsPromises);
  } catch (error) {
    console.error("Error listing user files:", error);
    throw error;
  }
};

export { storage };
