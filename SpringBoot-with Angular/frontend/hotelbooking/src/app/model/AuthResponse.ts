import { User } from "./user.model";

// auth-response.model.ts
export interface AuthResponse {
    token: string;
    message?: string;
    user?: User;
  }
  