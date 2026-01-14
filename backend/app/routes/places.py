from fastapi import APIRouter, HTTPException
from app.database import db
from typing import List, Optional
import random

router = APIRouter()

@router.get("/")
async def get_places(search: Optional[str] = None):
    query = {}
    
    # Search specifically in the 'City' field as requested
    if search:
        query["City"] = {"$regex": search, "$options": "i"}

    # Fetch from MongoDB
    places_cursor = db.places.find(query)
    places_list = await places_cursor.to_list(length=100)

    processed_places = []
    for place in places_list:
        # Convert ObjectId to string
        place["id"] = str(place["_id"])
        del place["_id"]
        
        # --- GENERATE IMAGE ---
        # Since your DB doesn't have an image field, we fetch a relevant one 
        # from Unsplash using the City and Type keys.
        query_term = f"{place.get('City', 'India')} {place.get('Name', 'place')}"
        place["image"] = f"https://source.unsplash.com/400x300/?{query_term}"
        
        # Add a constructed description if you don't have one in DB
        if "description" not in place:
            place["description"] = (
                f"A beautiful {place.get('Significance', 'historical')} {place.get('Type', 'spot')} "
                f"located in {place.get('Zone', 'the')} zone. Best visited in the {place.get('Best Time to visit', 'day')}."
            )

        processed_places.append(place)

    return processed_places