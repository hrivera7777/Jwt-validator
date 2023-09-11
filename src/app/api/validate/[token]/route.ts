import jwt from "jsonwebtoken";
import * as fs from "fs";
import { NextResponse } from "next/server";
import RedisClient from "@/app/_config/_redis";
import { randomUUID } from "crypto";
import { revalidateTag } from "next/cache";
import { revalidationGetTokensTag } from "@/constants";

export async function GET(
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

  const keyRoute = process.env.SECRET_FILE ?? "./key";

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

  const client = RedisClient.getClient();
  await client.connect();

  // verify a token symmetric - synchronous
  try {
    const decoded = jwt.verify(token, privateKey);
    // good request
    const validation = {
      token,
      isValid: true,
      message: "Valid token",
    };
    await client.set(randomUUID(), JSON.stringify(validation));

    revalidateTag("get-tokens");

    await client.disconnect();

    return NextResponse.json(
      { isValid: true, message: "Valid token", decoded },
      { status: 200 }
    );
  } catch (err) {
    // bad request (token invalid)

    const validation = {
      token,
      isValid: false,
      message: "Invalid token",
    };
    await client.set(randomUUID(), JSON.stringify(validation));

    revalidateTag(revalidationGetTokensTag);

    await client.disconnect();

    return NextResponse.json(
      { isValid: false, message: "Invalid token", decoded: null },
      { status: 400 }
    );
  }
}
