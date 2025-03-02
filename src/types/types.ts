export interface AuthUser  {
  name?:string | null;
  email: string | null;
  token: string;
  joined?:string;
  picture?: string;
}

export interface User {
  email:string;
  password: string;
}

export interface IngredientInterface {
  _id?: string;
  checked?: boolean;
  ingredient: string,
  quantity: number,
  unit: string
}

export interface RecipeInterface {
  _id?: string;
  name: string;
  ingredients: IngredientInterface[],
  description?:string,
  imageUrl?: string,
  isPublic?: boolean,
  servings?: number
}

export type DayOfTheWeek =
  "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday"

  export const days: DayOfTheWeek[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

export type Meal = "Breakfast" | "Lunch" | "Snack" | "Dinner";
export const meals: Meal[] = ["Breakfast", "Lunch", "Snack", "Dinner"];

export interface MenuInterface {
  _id?: string;
  recipe: RecipeInterface | string,
  dayOfTheWeek: DayOfTheWeek,
  meal: Meal,
  createdAt?:string,
  updatedAt?:string,
  servings?: number
}

export type SelectedRecipesState = {
  [meal: string]: RecipeInterface | null;
};