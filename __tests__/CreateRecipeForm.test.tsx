jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));

import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "@testing-library/react";
import CreateRecipeForm from "@/components/forms/CreateRecipeForm";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "@/lib/store/auth/authSlice";
import { ReactElement } from "react";
import unitsReducer from "@/lib/store/apis/unitsSlice";
import ingredientsReducer from "@/lib/store/apis/ingredientsSlice";

export const mockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      units: unitsReducer,
      ingredients: ingredientsReducer,
    },
    preloadedState,
  });
};

export const renderWithProviders = (
  ui: ReactElement,
  { preloadedState = {} } = {}
) => {
  const store = mockStore(preloadedState);

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

const mockIngredients = ["Flour", "Sugar", "Salt"];

describe("Create Recipe Component - User Flow Tests", () => {
  test("Renders Create Recipe component on the page", () => {
    const component = renderWithProviders(<CreateRecipeForm />);
    const form = component.container.querySelector("form");
    expect(form).toBeInTheDocument();
  });

  test("Allow to introduce recipe name", () => {
    renderWithProviders(<CreateRecipeForm />);

    const input = screen.getByLabelText(/Recipe name */i);
    fireEvent.change(input, { target: { value: "Pancakes" } });

    expect(input).toHaveValue("Pancakes");
  });

  test("Allow ingredients addition and shows them on the list", async () => {
    renderWithProviders(<CreateRecipeForm />, {
      preloadedState: {
        ingredients: {
          ingredients: mockIngredients,
        },
      },
    });

    const ingredientInput = screen.getByLabelText(/Ingredients */i);
    fireEvent.change(ingredientInput, { target: { value: "Flour" } });

    const ingredientOption = await screen.findByText(/Flour/i);
    expect(ingredientOption).toBeInTheDocument();
    fireEvent.click(ingredientOption);

    await waitFor(() => {
      expect(screen.getByText(/Flour/i)).toBeInTheDocument();
    });
  });

  test("Avoid duplicate ingredients", async () => {
    renderWithProviders(<CreateRecipeForm />, {
      preloadedState: {
        ingredients: {
          ingredients: mockIngredients,
        },
      },
    });

    const ingredientInput = screen.getByLabelText(/Ingredients/i);

    fireEvent.change(ingredientInput, { target: { value: "Flour" } });
    const ingredientOptionOne = await screen.findAllByText(/Flour/i);
    fireEvent.click(ingredientOptionOne[0]);

    fireEvent.change(ingredientInput, { target: { value: "Flour" } });
    const ingredientOptionTwo = await screen.findAllByText(/Flour/i);
    fireEvent.click(ingredientOptionTwo[0]);

    await waitFor(() => {
      expect(
        screen.getByText("An ingredient can't be added twice")
      ).toBeInTheDocument();
    });
  });

  test("Allow ingredient deletion", async () => {
    renderWithProviders(<CreateRecipeForm />, {
      preloadedState: {
        ingredients: {
          ingredients: mockIngredients,
        },
      },
    });

    const ingredientInput = screen.getByLabelText(/Ingredients/i);
    fireEvent.change(ingredientInput, { target: { value: "Flour" } });

    const ingredientOption = await screen.findByText(/Flour/i);
    expect(ingredientOption).toBeInTheDocument();
    fireEvent.click(ingredientOption);

    await waitFor(() => {
      expect(screen.getByText(/Flour/i)).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole("delete-ingredient");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(/Flour/i)).not.toBeInTheDocument();
    });
  });

  test("Show error if try to send recipe without recipe name", async () => {
    renderWithProviders(<CreateRecipeForm />);

    const submitButton = screen.getByText("Create");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Please enter a recipe name/i)
      ).toBeInTheDocument();
    });
  });

  test("Show error if try to send recipe without any ingredients", async () => {
    renderWithProviders(<CreateRecipeForm />);

    const input = screen.getByLabelText(/Recipe name */i);
    fireEvent.change(input, { target: { value: "Pancakes" } });

    const submitButton = screen.getByText("Create");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Please enter at least one ingredient/i)
      ).toBeInTheDocument();
    });
  });

  test("Don't show any errors after a successful recipe creation", async () => {
    renderWithProviders(<CreateRecipeForm />, {
      preloadedState: {
        ingredients: {
          ingredients: mockIngredients,
        },
      },
    });

    const nameInput = screen.getByLabelText(/Recipe name/i);
    fireEvent.change(nameInput, { target: { value: "Pancakes" } });

    const ingredientInput = screen.getByLabelText(/Ingredients/i);
    fireEvent.change(ingredientInput, { target: { value: "Flour" } });

    const ingredientOption = await screen.findByText(/Flour/i);
    fireEvent.click(ingredientOption);

    fireEvent.change(screen.getByPlaceholderText("0"), {
      target: { value: "200" },
    });

    const unitSelect = screen.getByRole("unit-combobox");
    fireEvent.change(unitSelect, { target: { value: "grams" } });

    const submitButton = screen.getByText("Create");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByRole("error")).not.toBeInTheDocument();
    });
  });
});
