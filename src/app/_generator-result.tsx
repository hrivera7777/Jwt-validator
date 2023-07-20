"use client";
import { ResponseGenerator } from "@/types";
import { fetchData, isResponseGenerator } from "@/utils/fetchData";
import { FC, useEffect, useState } from "react";
interface Props {
  valueToSend: string;
}

const server =
  process.env.NEXT_PUBLIC_BASE_URL_GENERATOR ?? "http://localhost:3001";

const GeneratorResult: FC<Props> = ({ valueToSend }) => {
  const [data, setData] = useState<ResponseGenerator | null>(null);

  useEffect(() => {
    const url = `${server}/${valueToSend}`;
    fetchData(url).then((responseData) => {
      if (isResponseGenerator(responseData)) setData(responseData);
    });
  }, [valueToSend]);

  if (!data) {
    return <span>Loading...</span>;
  }

  if (data.error !== null) {
    <div className="flex flex-col items-center justify-center w-full">
      <h4 className="text-6xl font-bold text-center">Generator Result</h4>
      <span className="text-2xl font-bold text-center">{data.error}</span>
    </div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full">
      <h4 className="text-5xl font-bold text-center">Generator Result</h4>
      <span className="text-2xl font-bold text-center w-10/12 break-words">
        {data.token}
      </span>
    </div>
  );
};

export default GeneratorResult;
