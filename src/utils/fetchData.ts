import { ResponseValidator } from "@/types";
import { ResponseGenerator } from "@/types";

export const isResponseValidator = (data: any): data is ResponseValidator => {
  return data && data.isValid !== undefined && data.message !== undefined;
};

export const isResponseGenerator = (data: any): data is ResponseGenerator => {
  return data && data.token !== undefined;
};

export const fetchData = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (isResponseValidator(data)) {
    return data;
  }
  if (isResponseGenerator(data)) {
    return data;
  }

  throw new Error("Invalid response");
};
