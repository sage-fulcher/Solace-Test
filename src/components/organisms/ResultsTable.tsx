import { advocate } from "@/types/advocates";
import { ResultsTableHeader } from "./atoms/ResultsTableHeader";
import { AdvocateRowItem } from "./molecules/AdvocateRowItem";

interface IResultsTableProps {
  advocates: Array<advocate>;
}
export const ResultsTable = ({ advocates }: IResultsTableProps) => {
  return (
    <table className="w-full border-collapse divide-y divide-gray-600">
      <ResultsTableHeader />
      <tbody className="divide-y divide-gray-300">
        {advocates.map((advocate, i) => {
          return <AdvocateRowItem advocate={advocate} key={i} />;
        })}
      </tbody>
    </table>
  );
};
