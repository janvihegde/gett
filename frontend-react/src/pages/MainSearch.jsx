// frontend-react/src/pages/MainSearch.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainSearch = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/places/${query}`);
        }
    };

    // Inline styles for the hero section
    const heroStyle = {
        height: '100vh',
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: "'Poppins', sans-serif"
    };

    const inputStyle = {
        padding: '15px 20px',
        fontSize: '18px',
        width: '400px',
        maxWidth: '80vw',
        borderRadius: '30px',
        border: 'none',
        outline: 'none',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    };

    const buttonStyle = {
        padding: '15px 30px',
        fontSize: '18px',
        marginLeft: '10px',
        borderRadius: '30px',
        border: 'none',
        background: '#0984e3',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    };

    return (
        <div style={heroStyle}>
            <h1 style={{fontSize: '3.5rem', marginBottom: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
                Travel Anywhere
            </h1>
            <p style={{fontSize: '1.2rem', marginBottom: '2rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>
                Discover your next great adventure
            </p>
            <form onSubmit={handleSearch} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px'}}>
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Where do you want to go? (e.g., Paris)"
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Explore</button>
            </form>
        </div>
    );
}

export default MainSearch;