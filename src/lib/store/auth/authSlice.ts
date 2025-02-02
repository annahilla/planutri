import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, loginUserWithGoogle, logoutUser, signUpUser } from "@/lib/store/auth/authActions";
import { AuthUser } from "@/types/types";

interface AuthState {
  user: AuthUser | null;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = { user: null, error: null, loading: false };  

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Unknown error occurred.";
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Unknown error occurred.";
      })
      .addCase(loginUserWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Unknown error occurred.";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Unexpected error occurred.";
      });
  },
});

export const { setUser, setError, logout } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;