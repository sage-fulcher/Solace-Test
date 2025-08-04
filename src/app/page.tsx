"use client";

import { advocate } from "@/types/advocates";
import { useEffect, useState } from "react";
import { SearchBar } from "./molecules/SearchBar";
import { ResultsTable } from "./organisms/ResultsTable";
import { param } from "drizzle-orm";

export default function Home() {
  const [advocates, setAdvocates] = useState<advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("alice");
  const [cursor, setCursor] = useState("0");
  const [filteredAdvocates, setFilteredAdvocates] = useState<advocate[]>([]);

  useEffect(() => {
    const params = new URLSearchParams({
      cursor: cursor,
      term: searchTerm,
    });
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm);

      console.log("fetching advocates...", params.toString());
      fetch("/api/advocates" + `?${params.toString()}`).then((response) => {
        response.json().then((jsonResponse) => {
          setAdvocates(jsonResponse.data);
          setFilteredAdvocates(jsonResponse.data);
        });
      });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [cursor, searchTerm]);

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
      <ResultsTable advocates={advocates} />
    </main>
  );
}
