import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const searchPlaces = async (term) => {
    try {
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
        throw error;
    }
};

// --- DELETE FUNCTION ---
export const deleteFromItinerary = async (id) => {
    try {
        // Sends a DELETE request to /api/itineraries/{id}
        await axios.delete(`${API_URL}/itineraries/${id}`);
    } catch (error) {
        console.error("Delete Error:", error);
        throw error;
    }
};