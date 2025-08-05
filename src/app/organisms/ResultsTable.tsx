import { advocate } from "@/types/advocates";
import { ResultsTableHeader } from "../atoms/ResultsTableHeader";
import { AdvocateRowItem } from "../molecules/AdvocateRowItem";

interface IResultsTableProps {
  advocates: Array<advocate>;
}
export const ResultsTable = ({ advocates }: IResultsTableProps) => {
  return (
    <table>
      <ResultsTableHeader />
      <tbody>
        {advocates.map((advocate, i) => {
          return <AdvocateRowItem advocate={advocate} key={i} />;
        })}
      </tbody>
    </table>
  );
};
