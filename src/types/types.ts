export interface AuthUser  {
  name?:string | null;
  email: string | null;
  token: string;
}

export interface User {
  email:string;
  password: string;
}

export interface IngredientInterface {
  _id?: string;
  ingredient: string,
  quantity: number,
  unit: string
}

export interface Recipe {
  _id?: string;
  name: string;
  ingredients: IngredientInterface[],
  description?:string
}