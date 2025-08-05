"use client";

import { advocate } from "@/types/advocates";
import { useCallback, useEffect, useState } from "react";
import { SearchBar } from "../components/organisms/molecules/SearchBar";
import { ResultsTable } from "../components/organisms/ResultsTable";
import { StyledButton } from "@/components/organisms/atoms/Button";
import { LoadingAnimation } from "@/components/organisms/atoms/Loading";

export default function Home() {
  const [advocates, setAdvocates] = useState<advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cursor, setCursor] = useState(0);
  const [nextCursor, setNextCursor] = useState(0);
  const [previousCursors, setPreviousCursors] = useState<Array<number>>([]);
  const [pageSize] = useState(3);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams({
      cursor: cursor.toString(),
      pageSize: pageSize.toString(),
      term: searchTerm,
    });
    const delayDebounceFn = setTimeout(() => {
      setFetching(true);
      fetch("/api/advocates" + `?${params.toString()}`).then((response) => {
        response.json().then((jsonResponse) => {
          const data = jsonResponse.data;
          if (data.length > 3) {
            setNextCursor(data.pop().id);
          } else {
            setNextCursor(0);
          }
          setFetching(false);
          setAdvocates(data);
        });
      });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [cursor, searchTerm]);

  const resetCursors = () => {
    setCursor(0);
    setPreviousCursors([]);
    setNextCursor(0);
  };
  const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
    resetCursors();
  };

  const onSearchTermReset = () => {
    setSearchTerm("");
    resetCursors();
  };
  const moveCursorForward = useCallback(() => {
    console.log("Forward", cursor, nextCursor, previousCursors);
    setPreviousCursors([...previousCursors, cursor]);
    setCursor(nextCursor);
  }, [cursor, nextCursor, previousCursors]);

  const moveCursorBackward = useCallback(() => {
    const mostRecentCursor = previousCursors.pop();
    console.log("back", cursor, nextCursor, mostRecentCursor);
    if (mostRecentCursor !== undefined) {
      setNextCursor(cursor);
      setCursor(mostRecentCursor);
    }
  }, [cursor, nextCursor]);

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      {fetching ? "yes" : "no"}
      <SearchBar
        value={searchTerm}
        onChange={onSearchTermChange}
        onReset={onSearchTermReset}
      />
      <br />
      <br />
      {fetching ? <LoadingAnimation /> : <ResultsTable advocates={advocates} />}
      <div className="flex flex-row-reverse">
        <StyledButton
          onClick={() => moveCursorForward()}
          disabled={nextCursor === 0}
        >
          {"next page!"}
        </StyledButton>
        <StyledButton
          onClick={() => moveCursorBackward()}
          disabled={previousCursors.length <= 0}
        >
          {"previous page!"}
        </StyledButton>
      </div>
    </main>
  );
}
