import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import unitsReducer from "./apis/unitsSlice";
import ingredientsReducer from "./apis/ingredientsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth: authReducer,
        units: unitsReducer,
        ingredients: ingredientsReducer
    }
  })
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']