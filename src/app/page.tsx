"use client";

import { useState } from "react";
import ValidationResult from "./_validation-result";
import InputToken from "./_input-token";

export default function Home() {
  const [idGenerator, setIdGenerator] = useState<string>("");
  return (
    <main className="flex min-h-screen flex-col justify-center items-center gap-14 p-24">
      <InputToken setIdGenerator={setIdGenerator} />
      <ValidationResult idGenerator={idGenerator} />
    </main>
  );
}
