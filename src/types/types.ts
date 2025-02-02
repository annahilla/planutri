export interface AuthUser  {
  name?:string | null;
  email: string | null;
  token: string;
}

export interface User {
  email:string;
  password: string;
}
