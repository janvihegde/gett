from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

# Correct usage: get the variable NAME, not the value itself
uri = os.getenv("MONGODB_URI") 
db_name = os.getenv("DATABASE_NAME", "places")

if not uri:
    # Fallback or error if .env is missing
    print("Warning: MONGODB_URI not found in .env, checking local...")
    # client = MongoClient("mongodb://localhost:27017") # Uncomment for local
    raise ValueError("MONGODB_URI is missing from .env file")
else:
    client = MongoClient(uri)

db = client[db_name]

places_collection = db["places"]
itineraries_collection = db["itineraries"]