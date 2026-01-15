from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")
# Use the correct DB name found in your cluster
DB_NAME = os.getenv("DATABASE_NAME", "geo_tourism")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# Try to find the collection. It usually matches the DB name or is simply "places"
# We check which one exists to be safe.
if "places" in db.list_collection_names():
    places_collection = db["places"]
elif "geo_tourism" in db.list_collection_names():
    places_collection = db["geo_tourism"]
else:
    # Fallback to the first available collection if specific names fail
    cols = db.list_collection_names()
    places_collection = db[cols[0]] if cols else db["places"]

itineraries_collection = db["itineraries"]

try:
    client.admin.command('ping')
    print(f"✅ Connected to MongoDB! Using Database: '{DB_NAME}', Collection: '{places_collection.name}'")
except Exception as e:
    print(f"❌ Connection failed: {e}")