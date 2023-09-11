import { JwtPayload } from "jsonwebtoken";

export interface ResponseValidator {
  isValid: boolean;
  message: string;
  decoded: string | JwtPayload | null;
}

export interface ResponseGenerator {
  token: string;
  error: string | null;
}

export interface ValidationToken {
  token: string;
  isValid: boolean;
  message: string;
}

export interface ResponseGetTokens {
  Error: string | null;
  message: string;
  data: ValidationToken[];
}
