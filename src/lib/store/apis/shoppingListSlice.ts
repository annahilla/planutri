import { getShoppingList } from "@/services/shoppingListService";
import { AuthUser, IngredientInterface } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShoppingListState {
  shoppingList: IngredientInterface[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ShoppingListState = {
    shoppingList: [],
    status: "idle",
    error: null,
}

export const fetchShoppingList = createAsyncThunk("/api/shopping-list", async (_, { getState }) => {
  const state = getState() as { auth: { user: AuthUser } };
  const token = state.auth.user.token;
  const data = await getShoppingList(token);
  return data;
});

const ShoppingListSlice = createSlice({
    name: "shoppingList",
    initialState,
    reducers: {
      setShoppingList: (state, action: PayloadAction<{ menu: IngredientInterface[] }>) => {
      state.shoppingList = action.payload.menu;
    }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchShoppingList.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchShoppingList.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.shoppingList = action.payload;
          })
          .addCase(fetchShoppingList.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || "Failed to fetch menu";
          })
    }
})

export const { setShoppingList } = ShoppingListSlice.actions;

const shoppingListReducer = ShoppingListSlice.reducer;
export default shoppingListReducer;