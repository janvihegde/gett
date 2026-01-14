from pydantic import BaseModel
from typing import List, Optional

class User(BaseModel):
    name: str
    email: str
    preferences: Optional[List[str]] = []

class Place(BaseModel):
    name: str
    category: str
    location: dict   # GeoJSON
    rating: float



class Itinerary(BaseModel):
    user_id: str
    places: List[str]
