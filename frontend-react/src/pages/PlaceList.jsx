// src/pages/PlaceList.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchPlaces } from '../api';

export default function PlaceList() {
  const { locationName } = useParams();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Determine which places to show
    async function loadPlaces() {
      try {
        const data = await searchPlaces(locationName);
        setPlaces(data); 
      } catch (error) {
        console.error("Failed to load places", error);
        // Fallback dummy data if backend isn't ready yet
        setPlaces([
          { id: 1, name: `${locationName} Museum`, type: 'History' },
          { id: 2, name: `${locationName} Park`, type: 'Nature' },
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadPlaces();
  }, [locationName]);

  const handleAddToItinerary = (place) => {
    // Save to localStorage for simplicity (or call API here)
    const currentItinerary = JSON.parse(localStorage.getItem('myItinerary') || '[]');
    
    // Avoid duplicates
    if (!currentItinerary.find(p => p.id === place.id)) {
      const newPlace = { ...place, visited: false }; // Add visited flag
      localStorage.setItem('myItinerary', JSON.stringify([...currentItinerary, newPlace]));
      alert(`${place.name} added to your itinerary!`);
    } else {
      alert("Already in itinerary");
    }
  };

  if (loading) return <p>Loading tourist spots...</p>;

  return (
    <div className="list-container">
      <h2>Exploring: {locationName}</h2>
      <div className="grid">
        {places.map((place) => (
          <div key={place.id} className="card">
            <h3>{place.name}</h3>
            <p>{place.type}</p>
            <button onClick={() => handleAddToItinerary(place)}>
              + Add to Itinerary
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}