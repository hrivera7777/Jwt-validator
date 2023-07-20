import { useState } from "react";
import type { FC } from "react";

interface Props {
  setIdGenerator: (value: string) => void;
}

const InputToken: FC<Props> = ({ setIdGenerator }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-6xl font-bold text-center">Token input</h2>
      <input
        type="text"
        className="w-full max-w-lg p-4 text-2xl border-2 border-gray-300 text-black rounded-lg focus:outline-none focus:border-blue-500"
        onChange={(e) => setIdGenerator(e.target.value)}
      />
    </div>
  );
};

export default InputToken;
