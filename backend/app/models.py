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

class Itinerary(BaseModel):
    id: Optional[str] = None
    name: str
    location: str
    description: Optional[str] = "No description available"
    rating: Optional[str] = "N/A"
    price: Optional[str] = "0"
    image: Optional[str] = None
    
    class Config:
        extra = "ignore"