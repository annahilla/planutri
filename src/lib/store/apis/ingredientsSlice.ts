import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface IngredientsState {
  ingredients: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  status: "idle",
  error: null,
};

export const fetchIngredients = createAsyncThunk("/api/ingredients", async () => {
  const response = await fetch("/api/ingredients");
  const data = await response.json();
  return data[0].ingredients;
});

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch ingredients";
      });
  },
});

const ingredientsReducer = ingredientsSlice.reducer
export default ingredientsReducer;
