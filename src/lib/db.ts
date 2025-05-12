
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc, 
  addDoc, 
  serverTimestamp, 
  Timestamp, 
  DocumentData 
} from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

// User profile operations
export const createUserProfile = async (userId: string, userData: any) => {
  try {
    await setDoc(doc(db, "users", userId), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Summary operations
export const saveSummary = async (userId: string, summaryData: any) => {
  try {
    const summaryRef = await addDoc(collection(db, "summaries"), {
      userId,
      ...summaryData,
      createdAt: serverTimestamp(),
    });
    return summaryRef.id;
  } catch (error) {
    console.error("Error saving summary:", error);
    throw error;
  }
};

export const getUserSummaries = async (userId: string) => {
  try {
    const q = query(collection(db, "summaries"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting user summaries:", error);
    throw error;
  }
};

export const deleteSummary = async (summaryId: string) => {
  try {
    await deleteDoc(doc(db, "summaries", summaryId));
    return true;
  } catch (error) {
    console.error("Error deleting summary:", error);
    throw error;
  }
};

// Notes operations
export const saveNote = async (userId: string, noteData: any) => {
  try {
    const noteRef = await addDoc(collection(db, "notes"), {
      userId,
      ...noteData,
      createdAt: serverTimestamp(),
    });
    return noteRef.id;
  } catch (error) {
    console.error("Error saving note:", error);
    throw error;
  }
};

export const getUserNotes = async (userId: string) => {
  try {
    const q = query(collection(db, "notes"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting user notes:", error);
    throw error;
  }
};

export const deleteNote = async (noteId: string) => {
  try {
    await deleteDoc(doc(db, "notes", noteId));
    return true;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

export { db };
