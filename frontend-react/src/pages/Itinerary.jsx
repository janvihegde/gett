import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/PlaceList.css';

// Ensure this matches your backend URL
const API_BASE = 'http://localhost:8000/api';

const Itinerary = () => {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchItineraries();
    }, []);

    const fetchItineraries = async () => {
        try {
            const response = await axios.get(`${API_BASE}/itineraries`);
            setItineraries(response.data);
            setError(null);
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Could not load itinerary. Is backend running?");
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id) => {
        if (!confirm("Remove this place?")) return;
        try {
            await axios.delete(`${API_BASE}/itineraries/${id}`);
            // Remove from UI immediately
            setItineraries(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            alert("Failed to delete item");
        }
    };

    return (
        <div className="place-list-container">
            <header className="results-header">
                <Link to="/" className="back-link">← Home</Link>
                <h1>My Itinerary</h1>
            </header>

            {error && <div className="error-message">{error}</div>}
            
            {loading ? (
                <div className="loader">Loading...</div>
            ) : itineraries.length === 0 ? (
                <div className="empty-state">
                    <h3>No plans yet!</h3>
                    <p>Search for a place and add it to your list.</p>
                </div>
            ) : (
                <div className="places-grid">
                    {itineraries.map((item) => (
                        <div key={item.id} className="place-card">
                            <div className="card-image" style={{backgroundImage: `url(${item.image})`}}>
                                <span className="rating">★ {item.rating}</span>
                            </div>
                            <div className="card-content">
                                <h2>{item.name}</h2>
                                <p className="location">📍 {item.location}</p>
                                <p className="description">{item.description}</p>
                                <div className="card-footer">
                                    <span className="price-tag">₹{item.price}</span>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => deleteItem(item.id)}
                                        style={{background:'#ff4d4d', color:'white', border:'none', padding:'8px 15px', borderRadius:'5px', cursor:'pointer'}}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Itinerary;