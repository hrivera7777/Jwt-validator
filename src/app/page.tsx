"use client";

import { useState } from "react";
import ValidationResult from "./_validation-result";
import InputToken from "./_input-token";
import GeneratorResult from "./_generator-result";

export default function Home() {
  const [idGenerator, setIdGenerator] = useState<string>("");
  const [tokenValidation, setTokenValidation] = useState<string>("");
  return (
    <main className="flex min-h-screen flex-col justify-center items-center gap-14 p-24">
      <div className="flex flex-col items-center gap-5 justify-center w-full">
        <InputToken setValue={setIdGenerator} text="Generator service" />
        <GeneratorResult valueToSend={idGenerator} />
      </div>
      <div className="flex flex-col items-center gap-5 justify-center w-full">
        <InputToken setValue={setTokenValidation} text="Validator service" />
        <ValidationResult valueToSend={tokenValidation} />
      </div>
    </main>
  );
}
