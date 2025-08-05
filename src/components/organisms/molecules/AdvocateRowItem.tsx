import { advocate } from "@/types/advocates";
import { Link } from "../atoms/Link";

interface AdvocateRowItemProps {
  advocate: advocate;
}

export const AdvocateRowItem = ({ advocate }: AdvocateRowItemProps) => {
  return (
    <tr>
      <td className="px-4 py-2" key={advocate.firstName}>
        {advocate.firstName}
      </td>
      <td className="px-4 py-2">{advocate.lastName}</td>
      <td className="px-4 py-2">{advocate.city}</td>
      <td className="px-4 py-2">{advocate.degree}</td>
      <td className="px-4 py-2">
        {advocate.specialties.map((s) => (
          <div key={s}>{s}</div>
        ))}
      </td>
      <td className="px-4 py-2">{advocate.yearsOfExperience}</td>
      <td className="px-4 py-2">
        <Link href={advocate.phoneNumber.toString()} />
      </td>
    </tr>
  );
};
