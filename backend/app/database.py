from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv("mongodb+srv://mejanvihegde_db_user:UYvp2M44qHh5tbbs@places.bnhxhtp.mongodb.net/?appName=places")
DATABASE_NAME = os.getenv("geo_tourism")

client = MongoClient("mongodb+srv://mejanvihegde_db_user:UYvp2M44qHh5tbbs@places.bnhxhtp.mongodb.net/?appName=places")
db = client["geo_tourism"]

# Collections
users_collection = db["users"]
places_collection = db["places"]
itineraries_collection = db["itineraries"]
