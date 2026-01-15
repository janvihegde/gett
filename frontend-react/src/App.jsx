import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainSearch from './pages/MainSearch';
import PlaceList from './pages/PlaceList';
import Itinerary from './pages/Itinerary';
import './App.css'; // Ensure you have the CSS below

function App() {
  return (
    <Router>
      {/* --- GLOBAL HEADER START --- */}
      <nav className="navbar">
        <div className="nav-brand">🌏 Travel AI</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/Itinerary">My Itinerary</Link>
        </div>
      </nav>
      {/* --- GLOBAL HEADER END --- */}

      <div className="app-content">
        <Routes>
          <Route path="/" element={<MainSearch />} />
          <Route path="/places/:query" element={<PlaceList />} />
          <Route path="/Itinerary" element={<Itinerary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;