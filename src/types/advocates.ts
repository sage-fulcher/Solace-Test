import { specialties } from "@/db/seed/advocates";

type specialty = (typeof specialties)[number];
export type advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: Array<specialty>;
  yearsOfExperience: number;
  phoneNumber: number;
};
