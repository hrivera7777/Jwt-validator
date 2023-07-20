import { JwtPayload } from "jsonwebtoken";

export interface ResponseData {
  isValid: boolean;
  message: string;
  decoded: string | JwtPayload | null;
}
