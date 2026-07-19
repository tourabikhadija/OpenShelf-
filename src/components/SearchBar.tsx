'use client';

import "@/style/SearchBar.css";

type SearchBarProps = {
    query : string;
    onSearch: (query: string) =>void;
};

export default function SearchBar({query, onSearch}: SearchBarProps){
    function handleChange(event: React.ChangeEvent<HTMLElement>) {
        onSearch(event.target.value);
    }

    return (
    <div className="search-container">
      <label htmlFor="search" className="search-label">
      </label>
      <input
        type="text"
        id="search"
        className="search-input"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}