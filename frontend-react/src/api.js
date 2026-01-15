import axios from 'axios';

// Ensure this matches your Uvicorn port
const API_URL = 'http://localhost:8000/api';

export const searchPlaces = async (term) => {
    try {
        // Calls the route we defined in step 2
        const response = await axios.get(`${API_URL}/places/search`, {
            params: { query: term }
        });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
};

export const addToItinerary = async (place) => {
    try {
        const response = await axios.post(`${API_URL}/itineraries`, place);
        return response.data;
    } catch (error) {
        console.error("Save Error:", error);
    }
};