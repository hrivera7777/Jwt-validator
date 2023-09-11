import { ResponseGetTokens, ResponseValidator } from "@/types";
import { ResponseGenerator } from "@/types";

export const isResponseValidator = (
  data: unknown
): data is ResponseValidator => {
  return (
    data !== undefined &&
    (data as ResponseValidator).isValid !== undefined &&
    (data as ResponseValidator).message !== undefined
  );
};

export const isResponseGenerator = (
  data: unknown
): data is ResponseGenerator => {
  return data !== undefined && (data as ResponseGenerator).token !== undefined;
};

export const isResponseGetTokens = (
  data: unknown
): data is ResponseGetTokens => {
  return data !== undefined && (data as ResponseGetTokens).data !== undefined;
};

export const fetchData = async (url: string, tags?: string[]) => {
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: {
      tags,
    },
  });
  const data = await response.json();
  if (isResponseValidator(data)) {
    return data;
  }
  if (isResponseGenerator(data)) {
    return data;
  }
  if (isResponseGetTokens(data)) {
    return data;
  }

  throw new Error("Invalid response");
};
