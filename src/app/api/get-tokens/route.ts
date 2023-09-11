import RedisClient from "@/app/_config/_redis";
import { ValidationToken } from "@/types";
import { NextResponse } from "next/server";

const isValidationTokenArray = (
  validationTokens: (unknown | null)[]
): validationTokens is ValidationToken[] => {
  return (
    Array.isArray(validationTokens) &&
    (validationTokens[0] as ValidationToken).token !== ""
  );
};

export async function GET(_request: Request) {
  try {
    const client = RedisClient.getClient();
    await client.connect();

    const keys = await client.keys("*");
    console.log(keys);

    const result = await Promise.all(
      keys.map(async (key) => {
        const value = await client.get(key);
        if (!value)
          return JSON.stringify({
            token: key,
            isValid: false,
            message: "Invalid token",
          });
        return value;
      })
    );

    const validationTokens = result.map((token) => {
      return JSON.parse(token);
    });

    if (!isValidationTokenArray(validationTokens)) {
      return NextResponse.json({
        Error: "Invalid response",
        message: "Internal server error - missing information",
        data: [],
      });
    }

    await client.disconnect();
    return NextResponse.json({
      Error: null,
      message: "Success",
      data: validationTokens,
    });
  } catch (err) {
    return NextResponse.json(
      {
        Error: err,
        message: "Internal server error - missing information",
        data: [],
      },
      { status: 500 }
    );
  }
}
