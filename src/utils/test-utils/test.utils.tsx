// test-utils.tsx
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "@/lib/store/apis/menuSlice"; // Importa el teu reducer real

export function renderWithProviders(
  ui: React.ReactElement,
  store = configureStore({ reducer: { menu: menuReducer } })
) {
  return render(<Provider store={store}>{ui}</Provider>);
}
