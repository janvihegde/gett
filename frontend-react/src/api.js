// src/api.js
import axios from 'axios';

// Ensure this matches your FastAPI url
const API_URL = 'http://127.0.0.1:8000'; 

export const api = axios.create({
  baseURL: API_URL,
});

// 1. Search for places (e.g., "Karnataka", "Paris")
export const searchPlaces = async (query) => {
  // Assuming your places route handles a query param like ?location=...
  // You might need to adjust endpoint based on your routes/places.py
  const response = await api.get(`/places?search=${query}`);
  return response.data;
};

// 2. Create or Get Itinerary
// For simplicity, we might just store the itinerary in local state, 
// but here is how you'd hit the backend:
export const addToItinerary = async (placeData) => {
  const response = await api.post('/itineraries/add', placeData);
  return response.data;
};

export const fetchItinerary = async () => {
    const response = await api.get('/itineraries');
    return response.data;
}