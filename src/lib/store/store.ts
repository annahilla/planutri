import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import unitsReducer from "./apis/unitsSlice";
import ingredientsReducer from "./apis/ingredientsSlice";
import shoppingListReducer from "./apis/shoppingListSlice";
import sidebarReducer from "./sidebar/sidebarSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth: authReducer,
        units: unitsReducer,
        ingredients: ingredientsReducer,
        shoppingList: shoppingListReducer,
        sidebar: sidebarReducer
    }
  })
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']