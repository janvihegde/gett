
import { useEffect, useState } from 'react';

export default function Itinerary() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('myItinerary') || '[]');
    setItems(stored);
  }, []);

  const toggleVisited = (id) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, visited: !item.visited } : item
    );
    setItems(updatedItems);
    localStorage.setItem('myItinerary', JSON.stringify(updatedItems));
  };

  return (
    <div className="itinerary-container">
      <h2>My Travel Checklist</h2>
      {items.length === 0 ? <p>No places added yet.</p> : (
        <ul>
          {items.map((place) => (
            <li key={place.id} className={place.visited ? 'visited' : ''}>
              <label>
                <input 
                  type="checkbox" 
                  checked={place.visited} 
                  onChange={() => toggleVisited(place.id)}
                />
                <span className="place-name">{place.name}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}