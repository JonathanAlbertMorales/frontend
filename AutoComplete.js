import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// Mocked searchData function to simulate API calls
const searchData = async (query) => {
  const response = await fetch('https://cdn.rawgit.com/prampcontent/180077452f9279073cab1035f60d30cf/raw/9cbf891a80bad9ad09c6261ef9578a65502922cc/search_helper.js');
  const text = await response.text();
  // Assuming the script returns a function that provides search results
  const func = new Function(text + '; return searchData;');
  return func()(query);
};

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    if (query.trim()) {
      const res = await searchData(query);
      setResults(res);
    } else {
      setResults([]);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), []);

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <div className="App">
      <form className="search-form">
        <input
          type="text"
          id="input"
          className="search-input"
          placeholder="Start typing a movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ul id="results">
          {results.map((item, index) => (
            <li key={index}>
              Title: {item.title} Rating: {item.rating}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
