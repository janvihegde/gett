// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainSearch from './pages/MainSearch';
import PlaceList from './pages/PlaceList';
import Itinerary from './pages/Itinerary';
import './App.css'; // We'll add some styles later

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <Link to="/">Home</Link> | <Link to="/itinerary">My Itinerary</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<MainSearch />} />
          <Route path="/places/:locationName" element={<PlaceList />} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;