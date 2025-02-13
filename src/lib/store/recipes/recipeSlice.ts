import { getRecipes } from "@/services/recipeService";
import { AuthUser, Recipe } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RecipeState {
  recipes: Recipe[];
  selectedRecipes: { [meal: string]: Recipe | null }; 
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RecipeState = {
    recipes: [],
    selectedRecipes: {},
    status: "idle",
    error: null,
}

export const fetchRecipes = createAsyncThunk("/api/recipes", async (_, { getState }) => {
  const state = getState() as { auth: { user: AuthUser } };
  const token = state.auth.user.token;
  const data = await getRecipes(token);
  return data;
});

const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
      setRecipes: (state, action: PayloadAction<{ menu: Recipe[] }>) => {
      state.recipes = action.payload.menu;
    }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchRecipes.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchRecipes.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.recipes = action.payload;
          })
          .addCase(fetchRecipes.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || "Failed to fetch menu";
          })
    }
})

export const { setRecipes } = recipeSlice.actions;

const recipeReducer = recipeSlice.reducer;
export default recipeReducer;