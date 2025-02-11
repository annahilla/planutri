import { getMenu } from "@/services/menuService";
import { AuthUser, MenuInterface, Recipe, SelectedRecipesState } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
  menu: MenuInterface[];
  selectedRecipes: { [meal: string]: Recipe | null }; 
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MenuState = {
    menu: [],
    selectedRecipes: {},
    status: "idle",
    error: null,
}

export const fetchMenu = createAsyncThunk("/api/menu", async (_, { getState }) => {
  const state = getState() as { auth: { user: AuthUser } };
  const token = state.auth.user.token;
  const data = await getMenu(token);
  return data;
});

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
      setMenu: (state, action: PayloadAction<{ menu: MenuInterface[] }>) => {
      state.menu = action.payload.menu;
    },
    setSelectedRecipes: (
      state,
      action: PayloadAction<SelectedRecipesState>
    ) => {
      state.selectedRecipes = action.payload;
    },
    deleteSelectedRecipes: (state) => {
      state.selectedRecipes = {}
    }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchMenu.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchMenu.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.menu = action.payload;
          })
          .addCase(fetchMenu.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || "Failed to fetch menu";
          })
    }
})

export const { setMenu, setSelectedRecipes } = menuSlice.actions;

const menuReducer = menuSlice.reducer;
export default menuReducer;