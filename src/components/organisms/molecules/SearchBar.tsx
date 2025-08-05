interface ISearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}
export const SearchBar = ({ value, onChange, onReset }: ISearchProps) => {
  return (
    <div>
      <p>Search</p>
      <p>
        Searching for: <span id="search-term"></span>
      </p>
      <input
        style={{ border: "1px solid black" }}
        value={value}
        onChange={onChange}
      />
      <button onClick={onReset}>Reset</button>
    </div>
  );
};
