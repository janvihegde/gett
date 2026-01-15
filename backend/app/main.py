from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import places, itineraries

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This mounts the routes at /api/places/search
app.include_router(places.router, prefix="/api/places", tags=["places"])
app.include_router(itineraries.router, prefix="/api/itineraries", tags=["itineraries"])

@app.get("/")
def read_root():
    return {"message": "Travel AI API is running"}