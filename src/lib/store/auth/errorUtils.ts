import { FirebaseError } from "firebase/app";

export const getFirebaseErrorMessage = (error: FirebaseError) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already in use.";
    case "auth/invalid-email":
      return "Please enter a valid email.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Your email or password are incorrect.";
    default:
      return "An unknown error occurred.";
  }
};

export const handleAuthError = (error: unknown) => {
  if (error instanceof FirebaseError) {
    return getFirebaseErrorMessage(error);
  }
  return "An unknown error occurred.";
};
