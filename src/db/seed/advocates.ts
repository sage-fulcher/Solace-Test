import { advocate } from "@/types/advocates";
import db from "..";
import { advocates } from "../schema";
import { faker } from "@faker-js/faker";
import { count } from "console";

export const specialties = [
  "Bipolar",
  "LGBTQ",
  "Medication/Prescribing",
  "Suicide History/Attempts",
  "General Mental Health (anxiety, depression, stress, grief, life transitions)",
  "Men's issues",
  "Relationship Issues (family, friends, couple, etc)",
  "Trauma & PTSD",
  "Personality disorders",
  "Personal growth",
  "Substance use/abuse",
  "Pediatrics",
  "Women's issues (post-partum, infertility, family planning)",
  "Chronic pain",
  "Weight loss & nutrition",
  "Eating disorders",
  "Diabetic Diet and nutrition",
  "Coaching (leadership, career, academic and wellness)",
  "Life coaching",
  "Obsessive-compulsive disorders",
  "Neuropsychological evaluations & testing (ADHD testing)",
  "Attention and Hyperactivity (ADHD)",
  "Sleep issues",
  "Schizophrenia and psychotic disorders",
  "Learning disorders",
  "Domestic abuse",
] as const;

const randomSpecialty = () => {
  const random1 = Math.floor(Math.random() * 24);
  const random2 = Math.floor(Math.random() * (24 - random1)) + random1 + 1;

  return [random1, random2];
};

const generateData = (amount: number) => {
  const results: Array<advocate> = [];
  for (let index = 0; index < amount; index++) {
    results.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      city: faker.location.city(),
      degree: faker.helpers.arrayElement(["MD", "MSW", "PhD"]),
      specialties: faker.helpers.arrayElements(specialties, { min: 2, max: 6 }),
      yearsOfExperience: faker.helpers.rangeToNumber({ min: 5, max: 30 }),
      phoneNumber: Number(
        faker.phone.number({ style: "international" }).replaceAll("+", "")
      ),
    });
  }
  return results;
};

const advocateData: Array<advocate> = generateData(500);

export { advocateData };
