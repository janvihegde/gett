from fastapi import APIRouter
from app.models import Itinerary
from app.database import itineraries_collection # This import works now!
from typing import List

router = APIRouter()

@router.get("/", response_model=List[Itinerary])
async def get_itineraries():
    itineraries = []
    for doc in itineraries_collection.find():
        doc["id"] = str(doc["_id"])
        itineraries.append(doc)
    return itineraries

@router.post("/", status_code=201)
async def create_itinerary(itinerary: Itinerary):
    new_itinerary = itinerary.dict()
    result = itineraries_collection.insert_one(new_itinerary)
    return {"message": "Itinerary saved", "id": str(result.inserted_id)}