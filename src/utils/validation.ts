export const validateUserInput = (email: string, password: string) => {
  if (!email || email.trim() === "") {
    return "Please enter an email";
  }

  if (!password || password.trim() === "") {
    return "Please enter a password";
  }

  return null; // No errors
};
