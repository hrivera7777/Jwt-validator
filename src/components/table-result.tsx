import { revalidationGetTokensTag } from "@/constants";
import { fetchData } from "@/utils/fetchData";

const server =
  process.env.NEXT_PUBLIC_BASE_URL_VALIDATOR ?? "http://localhost:3000/api";

const TableResult = async () => {
  const url = `${server}/get-tokens`;
  const tags = [revalidationGetTokensTag];

  const result = await fetchData(url, tags);

  if (!("data" in result)) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-5 justify-center w-full">
      <h4 className="text-5xl font-bold text-center">Table Result</h4>
      <table className="border border-white border-collapse p-2 table-auto">
        <thead>
          <tr className="border-b font-bold text-xl">
            <th className="border-r p-2">id</th>
            <th className="border-r p-2">Token</th>
            <th className="border-r p-2">Is Valid</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {result.data.map((validationToken, idx) => (
            <>
              <tr className="border-b" key={validationToken.token}>
                <td className="p-2 border-r">{idx}</td>
                <td className="text-lg p-2 border-r text-center max-w-4xl md:max-w-6xl break-all">
                  {validationToken.token}
                </td>
                <td className="text-lg border-r text-center">{`${
                  validationToken.isValid ? "yes" : "no"
                }`}</td>
                <td className="text-lg p-2 text-center">{`${validationToken.message}`}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableResult;
