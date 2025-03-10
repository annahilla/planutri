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

jest.mock("@tanstack/react-query", () => {
  const actual = jest.requireActual("@tanstack/react-query");
  return {
    ...actual,
    useQuery: jest.fn(() => ({
      data: mockIngredients,
      isLoading: false,
      isError: false,
    })),
  };
});

import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor, render } from "@testing-library/react";
import CreateRecipeForm from "@/components/forms/CreateRecipeForm";
import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const mockIngredients = ["Flour", "Sugar", "Salt"];

const fetchIngredients = () => mockIngredients;

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });

export const renderWithProviders = (ui: ReactElement) => {
  const queryClient = createTestQueryClient();

  queryClient.setQueryData(["ingredients"], fetchIngredients);

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Create Recipe Component - User Flow Tests", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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
    renderWithProviders(<CreateRecipeForm />);

    const ingredientInput = screen.getByLabelText(/Ingredients */i);
    fireEvent.change(ingredientInput, { target: { value: "Flour" } });

    const ingredientOption = screen.getByText("Flour");
    expect(ingredientOption).toBeInTheDocument();
    fireEvent.click(ingredientOption);

    await waitFor(() => {
      expect(screen.getByTestId(/Flour/i)).toBeInTheDocument();
    });
  });

  test("Avoid duplicate ingredients", async () => {
    renderWithProviders(<CreateRecipeForm />);

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
    renderWithProviders(<CreateRecipeForm />);

    const ingredientInput = screen.getByLabelText(/Ingredients/i);
    fireEvent.change(ingredientInput, { target: { value: "Flour" } });

    const ingredientOption = screen.getByText(/Flour/i);
    expect(ingredientOption).toBeInTheDocument();
    fireEvent.click(ingredientOption);

    const deleteButton = screen.getByRole("delete-ingredient");
    fireEvent.click(deleteButton);

    waitFor(() => {
      expect(ingredientOption).not.toBeInTheDocument();
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

    const nameInput = screen.getByLabelText(/Recipe name */i);
    fireEvent.change(nameInput, { target: { value: "Pancakes" } });

    const servingsInput = screen.getByLabelText(/Servings */i);
    fireEvent.change(servingsInput, { target: { value: "4" } });

    const submitButton = screen.getByText("Create");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Please enter at least one ingredient/i)
      ).toBeInTheDocument();
    });
  });

  test("Don't show any errors after a successful recipe creation", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "Recipe successfully created" }),
    });

    renderWithProviders(<CreateRecipeForm />);

    const nameInput = screen.getByLabelText(/Recipe name/i);
    fireEvent.change(nameInput, { target: { value: "Pancakes" } });

    const servingsInput = screen.getByLabelText(/Servings */i);
    fireEvent.change(servingsInput, { target: { value: "4" } });

    const mealInput = await screen.findByText(/Breakfast/i);
    fireEvent.click(mealInput);
    fireEvent.blur(mealInput);

    console.log(document.body.innerHTML);

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
      expect(mealInput).toHaveClass("bg-lightBrown");
      expect(screen.queryByRole("error")).not.toBeInTheDocument();
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
