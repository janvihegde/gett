import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchPlaces } from '../api';
import confetti from 'canvas-confetti';
import '../styles/PlaceList.css';

export default function PlaceList() {
  const { locationName } = useParams();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlaces() {
      try {
        const data = await searchPlaces(locationName);
        console.log("DB Data:", data); // Check console to see your specific fields
        setPlaces(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPlaces();
  }, [locationName]);

  const handleAdd = (place) => {
    confetti({ particleCount: 150, spread: 60, origin: { y: 0.7 } });
    
    const current = JSON.parse(localStorage.getItem('myItinerary') || '[]');
    // Using place.Name for ID check if 'id' isn't perfect, but place.id is preferred
    if (!current.find(p => p.Name === place.Name)) {
      localStorage.setItem('myItinerary', JSON.stringify([...current, { ...place, visited: false }]));
    }
  };

  return (
    <div className="page-wrapper">
      <div className="hero">
        <div className="hero-content">
          <h1>Exploring <span className="highlight">{locationName}</span></h1>
          <p>Top rated places in the city</p>
        </div>
      </div>

      <div className="content-container">
        {loading ? (
          <div className="loading-pulse">Loading amazing spots...</div>
        ) : places.length === 0 ? (
          <div className="empty-state">
            <h2>🌍 No places found in "{locationName}"</h2>
            <p>Try searching for "Delhi" (matches your example data)</p>
          </div>
        ) : (
          <div className="grid">
            {places.map((place, index) => (
              <div 
                key={place.id} 
                className="card-modern"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-img-holder">
                  <img src={place.image} alt={place.Name} />
                  <span className="rating-badge">★ {place["Google review rating"] || 'N/A'}</span>
                </div>
                
                <div className="card-body">
                  <div className="tags">
                    <span className="category-tag">{place.Type}</span>
                    <span className="category-tag">{place.Significance}</span>
                  </div>
                  
                  <h3>{place.Name}</h3>
                  <p className="desc">{place.description}</p>
                  
                  <div className="details-grid">
                    <div className="detail-item">
                      <span>💰 Fee</span>
                      <strong>₹{place["Entrance Fee in INR"]}</strong>
                    </div>
                    <div className="detail-item">
                      <span>🕒 Time</span>
                      <strong>{place["time needed to visit in hrs"]} hrs</strong>
                    </div>
                    <div className="detail-item">
                      <span>🌤️ Best Time</span>
                      <strong>{place["Best Time to visit"]}</strong>
                    </div>
                  </div>

                  <button className="btn-primary" onClick={() => handleAdd(place)}>
                    Add to Itinerary
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}