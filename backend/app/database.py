from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DATABASE_NAME", "places")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# --- KEY FIX: Define these variables so they can be imported ---
places_collection = db["places"]
itineraries_collection = db["itineraries"] 

try:
    client.admin.command('ping')
    print("✅  Successfully connected to MongoDB!")
except Exception as e:
    print(f"❌  Connection failed: {e}")