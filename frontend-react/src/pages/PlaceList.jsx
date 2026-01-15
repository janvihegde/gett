import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { searchPlaces, addToItinerary } from '../api';
import '../styles/PlaceList.css';

const PlaceList = () => {
    const { query } = useParams();
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaces = async () => {
            setLoading(true);
            try {
                // Default to Delhi if no query
                const term = query || 'Delhi';
                console.log("Fetching for:", term);
                
                const data = await searchPlaces(term);
                console.log("Received Data:", data); // Check browser console (F12)
                setPlaces(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, [query]);

    const handleAdd = async (place) => {
        try {
            await addToItinerary(place);
            alert(`Added ${place.name} to your itinerary!`);
        } catch (error) {
            alert("Failed to add to itinerary");
        }
    };

    return (
        <div className="place-list-container">
            <div className="results-header">
                <Link to="/" className="back-link">← Back</Link>
                <h1>Exploring: <span className="highlight">{query || "Delhi"}</span></h1>
            </div>

            {/* --- DEBUG SECTION: Remove this after you see data! --- */}
            {/* <div style={{background: '#eee', padding: '10px', marginBottom: '20px', fontSize: '12px'}}>
                <strong>Debug Data Check:</strong> Found {places.length} items.
                <br/>
                First item name: {places[0]?.name || "None"}
            </div> */}
            {/* ----------------------------------------------------- */}

            {loading ? (
                <div className="loader">Loading places...</div>
            ) : (
                <div className="places-grid">
                    {places.map((place, index) => (
                        <div key={place.id || index} className="place-card">
                            {/* Use a valid image or a fallback color if image fails */}
                            <div 
                               
                            >
                                <span className="rating">★ {place.rating}</span>
                            </div>
                            
                            <div className="card-content">
                                <h2>{place.name}</h2>
                                <p className="location">📍 {place.location}</p>
                                
                                {/* Truncate description if too long */}
                                <p className="description" title={place.description}>
                                    {place.description && place.description.length > 100 
                                        ? place.description.substring(0, 100) + "..." 
                                        : place.description}
                                </p>
                                
                                <div className="card-footer">
                                    <span className="price-tag">
                                        {place.price === "0" ? "Free Entry" : `₹${place.price}`}
                                    </span>
                                    <button 
                                        className="add-btn"
                                        onClick={() => handleAdd(place)}
                                    >
                                        Add to Itinerary
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && places.length === 0 && (
                <div className="empty-state">
                    <h3>No results found.</h3>
                    <p>The backend returned 0 item.".</p>
                </div>
            )}
        </div>
    );
};

export default PlaceList;