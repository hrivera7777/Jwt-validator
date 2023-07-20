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
