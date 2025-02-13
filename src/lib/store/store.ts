import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import unitsReducer from "./apis/unitsSlice";
import ingredientsReducer from "./apis/ingredientsSlice";
import menuReducer from "./menu/menuSlice";
import recipeReducer from "./recipes/recipeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth: authReducer,
        units: unitsReducer,
        ingredients: ingredientsReducer,
        menu: menuReducer,
        recipes: recipeReducer
    }
  })
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']