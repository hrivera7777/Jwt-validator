"use client";
import { ResponseData } from "@/types";
import { FC, useEffect, useState } from "react";
interface Props {
  idGenerator: string;
}

const server = "http://localhost:3000";

const isResponseData = (data: any): data is ResponseData => {
  return data && data.isValid !== undefined && data.message !== undefined;
};

const ValidationResult: FC<Props> = ({ idGenerator }) => {
  const [data, setData] = useState<ResponseData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${server}/${idGenerator}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      if (!isResponseData(data)) {
        throw new Error("Invalid response");
      }
      setData(data);
    };

    fetchData();
  }, [idGenerator]);

  if (!data) {
    return <span>Loading...</span>;
  }

  const decodedValues =
    data.decoded && typeof data.decoded !== "string"
      ? Object.entries(data.decoded)
      : [];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-6xl font-bold text-center">Validation Result</h2>
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
