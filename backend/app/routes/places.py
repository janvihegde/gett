from fastapi import APIRouter
from app.database import places_collection
from typing import List, Optional

router = APIRouter()

@router.get("/search")
async def search_places(query: str):
    if not query:
        return []

    # Case-insensitive regex search across multiple fields
    regex_query = {"$regex": query, "$options": "i"}
    
    # Search logic: Look for match in Name, City, State, or Type
    cursor = places_collection.find({
        "$or": [
            {"Name": regex_query},
            {"City": regex_query},
            {"State": regex_query},
            {"Type": regex_query}
        ]
    }).limit(20)

    results = []
    for doc in cursor:
        # --- DATA MAPPING ---
        # We convert your DB keys to a standard format for the Frontend
        place = {
            "id": str(doc.get("_id")),
            "name": doc.get("Name", "Unknown Place"),
            "location": f"{doc.get('City', '')}, {doc.get('State', '')}",
            "rating": doc.get("Google review rating", "N/A"),
            "price": doc.get("Entrance Fee in INR", "Free"),
            
            # Create a rich description from your available fields
            "description": (
                f"A {doc.get('Significance', 'historic')} {doc.get('Type', 'site')} established in {doc.get('Establishment Year', 'N/A')}. "
                f"Best time to visit: {doc.get('Best Time to visit', 'Anytime')}."
            ),
            
            # Since your DB example had no image URL, we use a high-quality placeholder
            "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop"
        }
        results.append(place)
    
    return results