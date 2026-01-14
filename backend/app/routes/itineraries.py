from fastapi import APIRouter, HTTPException
from app.database import itineraries_collection
from app.models import Itinerary

router = APIRouter()

@router.post("/", status_code=201)
def create_itinerary(itinerary: Itinerary):
    # Convert Pydantic model to a dictionary
    itinerary_data = itinerary.model_dump()
    
    # Insert into MongoDB
    result = itineraries_collection.insert_one(itinerary_data)
    
    return {
        "message": "Itinerary created successfully",
        "id": str(result.inserted_id)
    }

@router.get("/")
def get_itineraries():
    # Fetch all itineraries (limit 10 for safety)
    itineraries = list(itineraries_collection.find().limit(10))
    
    # Convert ObjectId to string
    for it in itineraries:
        it["id"] = str(it["_id"])
        del it["_id"]
    
    return itineraries