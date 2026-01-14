// src/pages/MainSearch.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to the list page with the place name
      navigate(`/places/${query}`);
    }
  };

  return (
    <div className="search-container">
      <h1>Where do you want to go?</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Enter a place (e.g., Goa, Tokyo)..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">Let's Go</button>
      </form>
    </div>
  );
}