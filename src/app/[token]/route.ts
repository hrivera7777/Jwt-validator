import jwt from "jsonwebtoken";
import * as fs from "fs";
import { NextResponse } from "next/server";

export function GET(
  _request: Request,
  { params }: { params: { token: string } }
) {
  const { token } = params;
  if (typeof token !== "string" || !token) {
    return NextResponse.json(
      {
        isValid: false,
        message: "Invalid format or missing token",
        decoded: null,
      },
      { status: 400 }
    );
  }

  const keyRoute = process.env.SECRET_FILE ?? "../../../../key";

  const privateKey = fs.readFileSync(keyRoute);
  if (!privateKey) {
    return NextResponse.json(
      {
        isValid: false,
        message: "Internal server error - missing information",
        decoded: null,
      },
      { status: 500 }
    );
  }
  // verify a token symmetric - synchronous
  try {
    const decoded = jwt.verify(token, privateKey);
    // good request
    return NextResponse.json(
      { isValid: true, message: "Valid token", decoded },
      { status: 200 }
    );
  } catch (err) {
    // bad request (token invalid)
    return NextResponse.json(
      { isValid: false, message: "Invalid token", decoded: null },
      { status: 400 }
    );
  }
}
