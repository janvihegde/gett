from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Only import places and itineraries
from app.routes.places import router as places_router
from app.routes.itineraries import router as itineraries_router

app = FastAPI(
    title="Tourism Recommendation API",
    description="API for recommending tourist places based on user preferences",
    version="1.0.0"
)

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include only the needed routers
app.include_router(places_router, prefix="/places", tags=["Places"])
app.include_router(itineraries_router, prefix="/itineraries", tags=["Itineraries"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Tourism Recommendation API"}