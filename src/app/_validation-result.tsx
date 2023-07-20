"use client";
import { ResponseValidator } from "@/types";
import { fetchData, isResponseValidator } from "@/utils/fetchData";
import { FC, useEffect, useState } from "react";
interface Props {
  valueToSend: string;
}

const server =
  process.env.NEXT_PUBLIC_BASE_URL_VALIDATOR ?? "http://localhost:3000";

const ValidationResult: FC<Props> = ({ valueToSend }) => {
  const [data, setData] = useState<ResponseValidator | null>(null);

  useEffect(() => {
    const url = `${server}/${valueToSend}`;
    fetchData(url).then((responseData) => {
      if (isResponseValidator(responseData)) setData(responseData);
    });
  }, [valueToSend]);

  if (!data) {
    return <span>Loading...</span>;
  }

  const decodedValues =
    data.decoded && typeof data.decoded !== "string"
      ? Object.entries(data.decoded)
      : [];

  return (
    <div className="flex flex-col items-center gap-5 justify-center w-full">
      <h4 className="text-5xl font-bold text-center">Validation Result</h4>
      <span className="text-2xl font-bold text-center">{`Is Valid token: ${
        data.isValid ? "yes" : "no"
      }`}</span>
      <span className="text-2xl font-bold text-center">{`Message: ${data.message}`}</span>
      {data.decoded && typeof data.decoded === "string" ? (
        <span className="text-2xl font-bold text-center">{`decoded: ${data.decoded}`}</span>
      ) : null}
      {decodedValues.length > 0 ? (
        <div className="flex flex-col items-center justify-center w-full">
          <span className="text-2xl font-bold text-center">decoded:</span>
          {decodedValues.map(([key, value]) => (
            <span
              key={key}
              className="text-2xl font-bold text-center"
            >{`${key}: ${value}`}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ValidationResult;
