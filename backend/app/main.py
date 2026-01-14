from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import users, places, reviews, itineraries

app = FastAPI(
    title="Tourism Recommendation API",
    description="Location-aware tourism recommendation system",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(places.router, prefix="/places", tags=["Places"])
app.include_router(itineraries.router, prefix="/itineraries", tags=["Itineraries"])

@app.get("/")
def root():
    return {"message": "Tourism API is running 🚀"}
