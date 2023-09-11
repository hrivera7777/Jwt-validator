import ValidatorToken from "@/components/validator-token";
import GeneratorToken from "@/components/generator-token";
import TableResult from "@/components/table-result";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center gap-14 p-24">
      <GeneratorToken />
      <ValidatorToken />
      <div className="flex flex-col items-center gap-5 justify-center w-full">
        <TableResult />
      </div>
    </main>
  );
}
