import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  isCollapsed: boolean;
}

const initialState: SidebarState = {
  isCollapsed: false,
};

const SidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setCollapsed:(state, action: PayloadAction<{ value: boolean }>) => {
      state.isCollapsed = action.payload.value;
      if (typeof window !== "undefined") {
        localStorage.setItem("isNavbarCollapsed", String(action.payload.value));
        console.log(String(action.payload.value));
      }
    },
    loadCollapsedState: (state) => {
      if (typeof window !== "undefined") {
        const storedValue = localStorage.getItem("isNavbarCollapsed") === "true";
        state.isCollapsed = storedValue;
      }
    }
  },
});

export const { setCollapsed, loadCollapsedState } = SidebarSlice.actions;
const sidebarReducer = SidebarSlice.reducer
export default sidebarReducer;
