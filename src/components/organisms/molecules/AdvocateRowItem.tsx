import { advocate } from "@/types/advocates";

interface AdvocateRowItemProps {
  advocate: advocate;
}

export const AdvocateRowItem = ({ advocate }: AdvocateRowItemProps) => {
  return (
    <tr>
      <td key={advocate.firstName}>{advocate.firstName}</td>
      <td>{advocate.lastName}</td>
      <td>{advocate.city}</td>
      <td>{advocate.degree}</td>
      <td>
        {advocate.specialties.map((s) => (
          <div key={s}>{s}</div>
        ))}
      </td>
      <td>{advocate.yearsOfExperience}</td>
      <td>
        <a href={`tel:${advocate.phoneNumber}`}>{advocate.phoneNumber}</a>
      </td>
    </tr>
  );
};
