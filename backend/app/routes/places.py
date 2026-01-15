from fastapi import APIRouter
from app.database import places_collection
from typing import List
import random

router = APIRouter()

# Placeholder images since your DB doesn't have an 'Image' field

@router.get("/search")
async def search_places(query: str):
    if not query:
        return []

    print(f"🔍 Searching for: {query} in collection: {places_collection.name}")

    # Case-insensitive regex search
    regex_query = {"$regex": query, "$options": "i"}
    
    # Using YOUR database field names
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
        # Convert numeric fields safely
        try:
            rating = doc.get("Google review rating", "4.0")
            price = doc.get("Entrance Fee in INR", "0")
        except:
            rating = "4.0"
            price = "0"

        # Map DB fields to Frontend format
        results.append({
            "id": str(doc.get("_id")),
            "name": doc.get("Name", "Unknown Place"),
            "location": f"{doc.get('City', '')}, {doc.get('State', '')}",
            "rating": str(rating),
            "price": str(price),
            "description": (
                f"A {doc.get('Significance', 'historic')} {doc.get('Type', 'site')} "
                f"established in {doc.get('Establishment Year', 'ancient times')}. "
                f"Best visited in the {doc.get('Best Time to visit', 'morning')}."
            )
        })
    
    print(f"✅ Found {len(results)} matches.")
    return results