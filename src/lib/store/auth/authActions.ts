import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { setUser, setError, logout } from "./authSlice";
import { validateUserInput } from "@/utils/validation";
import { handleAuthError } from "./errorUtils";
import { AuthUser, User } from "@/types/types";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: User, thunkAPI) => {
    const errorMessage = validateUserInput(email, password);
    if (errorMessage) {
      thunkAPI.dispatch(setError(errorMessage));
      return thunkAPI.rejectWithValue(errorMessage);
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      const userData: AuthUser = { email: user.email!, token };
      thunkAPI.dispatch(setUser(userData));
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAuthError(error));
    }}
);

export const loginUserWithGoogle = createAsyncThunk(
  "auth/loginUserWithGoogle",
  async (_, thunkAPI) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      const userData = { name: user.displayName, email: user.email, token, joined: user.metadata.creationTime };
      thunkAPI.dispatch(setUser(userData));
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAuthError(error));
  }}
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (
    { email, password }: User, thunkAPI
  ) => {
    const errorMessage = validateUserInput(email, password);
    if (errorMessage) {
      thunkAPI.dispatch(setError(errorMessage));
      return thunkAPI.rejectWithValue(errorMessage);
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      const userData: AuthUser = { email: user.email!, token };
      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAuthError(error));   
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      thunkAPI.dispatch(logout());
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAuthError(error));
    }
  }
);