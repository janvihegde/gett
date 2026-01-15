import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { searchPlaces } from '../api';
import '../styles/PlaceList.css';

const PlaceList = () => {
    const { query } = useParams();
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaces = async () => {
            setLoading(true);
            try {
                // If query is empty, default to 'Delhi' to show your data
                const searchTerm = query || 'Delhi';
                const data = await searchPlaces(searchTerm);
                setPlaces(data);
            } catch (error) {
                console.error("Failed to fetch", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, [query]);

    return (
        <div className="place-list-container">
            <header className="results-header">
                <Link to="/" className="back-link">← Back</Link>
                <h1>Explore: <span className="highlight">{query || "All Destinations"}</span></h1>
            </header>

            {loading && <div className="loader">Searching database...</div>}

            {!loading && places.length === 0 && (
                <div className="empty-state">
                    <h3>No results found for "{query}"</h3>
                    <p>Try searching for "Delhi", "Agra", or "Tomb".</p>
                </div>
            )}

            <div className="places-grid">
                {places.map((place) => (
                    <div key={place.id} className="place-card">
                        <div className="card-image" style={{backgroundImage: `url(${place.image})`}}>
                            <span className="rating">★ {place.rating}</span>
                        </div>
                        <div className="card-content">
                            <h2>{place.name}</h2>
                            <p className="location">📍 {place.location}</p>
                            <p className="description">{place.description}</p>
                            <div className="card-footer">
                                <span className="price-tag">₹ {place.price}</span>
                                <button className="add-btn">Add to Plan</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlaceList;