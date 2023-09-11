"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { useState, type FC } from "react";
import InputToken from "./input-token";
import ValidationResult from "./validation-result";

const ValidatorToken: FC = () => {
  const [tokenValidation, setTokenValidation] = useState<string>("");
  const debouncedToken = useDebounce(tokenValidation);

  return (
    <div className="flex flex-col items-center gap-5 justify-center w-full">
      <InputToken setValue={setTokenValidation} text="Validator service" />
      <ValidationResult valueToSend={debouncedToken} />
    </div>
  );
};

export default ValidatorToken;
