"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { useState, type FC } from "react";
import GeneratorResult from "./generator-result";
import InputToken from "./input-token";

const GeneratorToken: FC = () => {
  const [idGenerator, setIdGenerator] = useState<string>("");
  const debouncedIdGenerator = useDebounce(idGenerator);
  return (
    <div className="flex flex-col items-center gap-5 justify-center w-full">
      <InputToken setValue={setIdGenerator} text="Generator service" />
      <GeneratorResult valueToSend={debouncedIdGenerator} />
    </div>
  );
};

export default GeneratorToken;
