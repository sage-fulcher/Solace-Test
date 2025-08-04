"use client";

import { advocate } from "@/types/advocates";
import { useEffect, useState } from "react";
import { SearchBar } from "./molecules/SearchBar";
import { ResultsTable } from "./organisms/ResultsTable";

export default function Home() {
  const [advocates, setAdvocates] = useState<advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAdvocates, setFilteredAdvocates] = useState<advocate[]>([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  useEffect(() => {
    const regex = new RegExp(searchTerm, "i");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        regex.test(advocate.firstName) ||
        regex.test(advocate.lastName) ||
        regex.test(advocate.city) ||
        regex.test(advocate.degree) ||
        regex.test(advocate.specialties.flat().toString()) ||
        regex.test(advocate.yearsOfExperience.toString())
      );
    });
    setFilteredAdvocates(filteredAdvocates);
  }, [searchTerm, advocates]);

  const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const onSearchTermReset = () => {
    setSearchTerm("");
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <SearchBar
        value={searchTerm}
        onChange={onSearchTermChange}
        onReset={onSearchTermReset}
      />
      <br />
      <br />
      <ResultsTable advocates={filteredAdvocates} />
    </main>
  );
}
