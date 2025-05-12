
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  AuthError
} from "firebase/auth";
import { app, auth } from "./firebase";

// Google authentication
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

// Email/Password sign up
export const signUpWithEmail = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update the user profile with display name
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
    }
    return userCredential.user;
  } catch (error) {
    console.error("Email sign-up error:", error);
    throw error;
  }
};

// Email/Password sign in
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Email sign-in error:", error);
    throw error;
  }
};

// Phone authentication setup
export const setupPhoneAuth = (elementId: string) => {
  try {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber
      }
    });
    return window.recaptchaVerifier;
  } catch (error) {
    console.error("Phone auth setup error:", error);
    throw error;
  }
};

// Phone authentication step 1: Send verification code
export const sendPhoneVerificationCode = async (phoneNumber: string) => {
  try {
    if (!window.recaptchaVerifier) {
      throw new Error("Recaptcha verifier not initialized");
    }
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
    window.confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    console.error("Phone verification error:", error);
    throw error;
  }
};

// Phone authentication step 2: Verify code
export const verifyPhoneCode = async (verificationCode: string) => {
  try {
    if (!window.confirmationResult) {
      throw new Error("No verification in progress");
    }
    const result = await window.confirmationResult.confirm(verificationCode);
    return result.user;
  } catch (error) {
    console.error("Code verification error:", error);
    throw error;
  }
};

// Password reset
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error("Password reset error:", error);
    throw error;
  }
};

// Sign out
export const logOut = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

// Helper function to get error message from Firebase Auth errors
export const getAuthErrorMessage = (error: AuthError): string => {
  const errorCode = error.code;
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/email-already-in-use':
      return 'This email is already registered.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/invalid-verification-code':
      return 'Invalid verification code.';
    case 'auth/invalid-phone-number':
      return 'Invalid phone number format.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    default:
      return 'An error occurred during authentication.';
  }
};

// Add TypeScript global declarations for window object
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | undefined;
    confirmationResult: any;
  }
}

export { auth };
