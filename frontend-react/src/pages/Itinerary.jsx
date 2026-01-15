// frontend-react/src/pages/Itinerary.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/PlaceList.css'; // Re-using your nice styles

const Itinerary = () => {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                // Fetch from your Python Backend
                const response = await axios.get('http://localhost:8000/api/itineraries');
                setItineraries(response.data);
            } catch (error) {
                console.error("Error fetching itineraries:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItineraries();
    }, []);

    return (
        <div className="place-list-container">
            <header className="results-header">
                <Link to="/" className="back-link">← Home</Link>
                <h1>My Itinerary</h1>
            </header>

            {loading ? (
                <div className="loader">Syncing with database...</div>
            ) : itineraries.length === 0 ? (
                <div className="empty-state">
                    <h3>Your itinerary is empty</h3>
                    <p>Go search for places and add them!</p>
                </div>
            ) : (
                <div className="places-grid">
                    {itineraries.map((item, index) => (
                        <div key={index} className="place-card">
                            <div className="card-content">
                                <h2>{item.place_name || item.name}</h2>
                                <p className="location">{item.location}</p>
                                <p className="description">{item.notes}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Itinerary;