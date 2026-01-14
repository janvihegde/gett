from pydantic import BaseModel
from typing import List, Optional, Dict, Any

# 1. Flexible Place Model (Matches your DB + Frontend needs)
class Place(BaseModel):
    id: Optional[str] = None
    name: str
    city: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    rating: Optional[float] = None
    image: Optional[str] = None
    
    # Allow extra fields from your specific DB structure 
    # (like "Entrance Fee in INR", "Best Time to visit")
    class Config:
        extra = "allow" 

# 2. Itinerary Model (This was missing!)
class Itinerary(BaseModel):
    user_id: Optional[str] = "guest"
    # This list will hold objects like { "name": "Taj Mahal", "visited": False }
    places: List[Dict[str, Any]] = []