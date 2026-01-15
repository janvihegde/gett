from fastapi import APIRouter, HTTPException
from app.models import Itinerary
from app.database import itineraries_collection
from typing import List
from bson import ObjectId

router = APIRouter()

@router.get("/", response_model=List[Itinerary])
async def get_itineraries():
    valid_itineraries = []
    
    # Loop through ALL documents in the collection
    for doc in itineraries_collection.find():
        # 1. Convert ObjectId to string
        doc["id"] = str(doc["_id"])
        
        # 2. Handle legacy data (map place_name -> name)
        if "name" not in doc and "place_name" in doc:
            doc["name"] = doc["place_name"]

        # 3. CRITICAL FIX: Skip documents that are missing required fields
        # This filters out the bad data causing your 500 Error
        if "name" not in doc or "location" not in doc:
            continue 

        # 4. Fill in missing optional fields to prevent other crashes
        if "description" not in doc: doc["description"] = "No description"
        if "price" not in doc: doc["price"] = "0"
        if "rating" not in doc: doc["rating"] = "N/A"
        if "image" not in doc: doc["image"] = ""

        valid_itineraries.append(doc)

    return valid_itineraries

@router.post("/", status_code=201)
async def create_itinerary(itinerary: Itinerary):
    new_item = itinerary.dict()
    if "id" in new_item:
        del new_item["id"]
    result = itineraries_collection.insert_one(new_item)
    return {"message": "Saved", "id": str(result.inserted_id)}

@router.delete("/{item_id}")
async def delete_itinerary(item_id: str):
    try:
        result = itineraries_collection.delete_one({"_id": ObjectId(item_id)})
        if result.deleted_count == 1:
            return {"message": "Deleted successfully"}
        raise HTTPException(status_code=404, detail="Item not found")
    except Exception as e:
        print(f"Delete Error: {e}")
        raise HTTPException(status_code=400, detail="Invalid ID")