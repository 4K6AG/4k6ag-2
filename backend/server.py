from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
from typing import List, Optional
from datetime import datetime

# Import models and database
from models import (
    StationInfo, StationInfoCreate, StationInfoUpdate,
    Equipment, EquipmentCreate, EquipmentUpdate,
    QSLCard, QSLCardCreate,
    Achievement, AchievementCreate,
    News, NewsCreate, NewsResponse,
    Gallery, GalleryCreate,
    Guestbook, GuestbookCreate, GuestbookResponse,
    ContactRequest, ContactRequestCreate, ContactResponse,
    StationStatusInfo, StationStatusUpdate,
    SuccessResponse, ErrorResponse
)
from database import (
    DatabaseManager,
    station_collection, equipment_collection, qsl_cards_collection,
    achievements_collection, news_collection, gallery_collection,
    guestbook_collection, contact_requests_collection
)

# Load environment
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create FastAPI app
app = FastAPI(title="4K6AG Radio Station API", version="1.0.0")

# Create API router
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    await DatabaseManager.ensure_indexes()
    await DatabaseManager.init_sample_data()
    logger.info("Database initialized successfully")

# Utility functions
def serialize_doc(doc):
    """Convert MongoDB document to dict with proper serialization"""
    if doc is None:
        return None
    
    # Convert ObjectId to string and handle datetime
    if '_id' in doc:
        doc['id'] = str(doc['_id'])
        del doc['_id']
    
    for key, value in doc.items():
        if isinstance(value, datetime):
            doc[key] = value.isoformat()
    
    return doc

def serialize_docs(docs):
    """Serialize list of documents"""
    return [serialize_doc(doc) for doc in docs]

# Station Information Endpoints
@api_router.get("/station", response_model=StationInfo)
async def get_station_info():
    """Get station information"""
    doc = await station_collection.find_one({"callsign": "4K6AG"})
    if not doc:
        raise HTTPException(status_code=404, detail="Station information not found")
    return serialize_doc(doc)

@api_router.put("/station", response_model=StationInfo)
async def update_station_info(station_data: StationInfoUpdate):
    """Update station information"""
    update_data = {k: v for k, v in station_data.dict().items() if v is not None}
    update_data['updated_at'] = datetime.utcnow()
    
    result = await station_collection.find_one_and_update(
        {"callsign": "4K6AG"},
        {"$set": update_data},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Station not found")
    
    return serialize_doc(result)

# Equipment Endpoints
@api_router.get("/equipment", response_model=List[Equipment])
async def get_equipment():
    """Get all equipment"""
    docs = await equipment_collection.find().to_list(100)
    return serialize_docs(docs)

@api_router.post("/equipment", response_model=Equipment)
async def create_equipment(equipment_data: EquipmentCreate):
    """Add new equipment"""
    equipment = Equipment(**equipment_data.dict())
    result = await equipment_collection.insert_one(equipment.dict(by_alias=True))
    
    created_doc = await equipment_collection.find_one({"_id": result.inserted_id})
    return serialize_doc(created_doc)

@api_router.put("/equipment/{equipment_id}", response_model=Equipment)
async def update_equipment(equipment_id: str, equipment_data: EquipmentUpdate):
    """Update equipment"""
    update_data = {k: v for k, v in equipment_data.dict().items() if v is not None}
    update_data['updated_at'] = datetime.utcnow()
    
    result = await equipment_collection.find_one_and_update(
        {"_id": equipment_id},
        {"$set": update_data},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Equipment not found")
    
    return serialize_doc(result)

@api_router.delete("/equipment/{equipment_id}")
async def delete_equipment(equipment_id: str):
    """Delete equipment"""
    result = await equipment_collection.delete_one({"_id": equipment_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Equipment not found")
    
    return {"success": True, "message": "Equipment deleted successfully"}

# QSL Cards Endpoints
@api_router.get("/qsl-cards", response_model=List[QSLCard])
async def get_qsl_cards():
    """Get all QSL cards"""
    docs = await qsl_cards_collection.find().sort("year", -1).to_list(100)
    return serialize_docs(docs)

@api_router.post("/qsl-cards", response_model=QSLCard)
async def create_qsl_card(qsl_data: QSLCardCreate):
    """Add new QSL card"""
    qsl_card = QSLCard(**qsl_data.dict())
    result = await qsl_cards_collection.insert_one(qsl_card.dict(by_alias=True))
    
    created_doc = await qsl_cards_collection.find_one({"_id": result.inserted_id})
    return serialize_doc(created_doc)

# Achievements Endpoints
@api_router.get("/achievements", response_model=List[Achievement])
async def get_achievements():
    """Get all achievements"""
    docs = await achievements_collection.find().sort("year", -1).to_list(100)
    return serialize_docs(docs)

@api_router.post("/achievements", response_model=Achievement)
async def create_achievement(achievement_data: AchievementCreate):
    """Add new achievement"""
    achievement = Achievement(**achievement_data.dict())
    result = await achievements_collection.insert_one(achievement.dict(by_alias=True))
    
    created_doc = await achievements_collection.find_one({"_id": result.inserted_id})
    return serialize_doc(created_doc)

# News Endpoints
@api_router.get("/news", response_model=NewsResponse)
async def get_news(limit: int = Query(10, ge=1, le=50), offset: int = Query(0, ge=0)):
    """Get news with pagination"""
    total = await news_collection.count_documents({})
    docs = await news_collection.find().sort("date", -1).skip(offset).limit(limit).to_list(limit)
    
    return {
        "news": serialize_docs(docs),
        "total": total
    }

@api_router.post("/news", response_model=News)
async def create_news(news_data: NewsCreate):
    """Add new news item"""
    if news_data.date is None:
        news_data.date = datetime.utcnow()
    
    news_item = News(**news_data.dict())
    result = await news_collection.insert_one(news_item.dict(by_alias=True))
    
    created_doc = await news_collection.find_one({"_id": result.inserted_id})
    return serialize_doc(created_doc)

# Gallery Endpoints
@api_router.get("/gallery", response_model=List[Gallery])
async def get_gallery():
    """Get all gallery images"""
    docs = await gallery_collection.find().sort("created_at", -1).to_list(100)
    return serialize_docs(docs)

@api_router.post("/gallery", response_model=Gallery)
async def create_gallery_item(gallery_data: GalleryCreate):
    """Add new gallery item"""
    gallery_item = Gallery(**gallery_data.dict())
    result = await gallery_collection.insert_one(gallery_item.dict(by_alias=True))
    
    created_doc = await gallery_collection.find_one({"_id": result.inserted_id})
    return serialize_doc(created_doc)

# Guestbook Endpoints
@api_router.get("/guestbook", response_model=GuestbookResponse)
async def get_guestbook(limit: int = Query(20, ge=1, le=100), offset: int = Query(0, ge=0)):
    """Get guestbook entries with pagination"""
    total = await guestbook_collection.count_documents({"approved": True})
    docs = await guestbook_collection.find({"approved": True}).sort("date", -1).skip(offset).limit(limit).to_list(limit)
    
    return {
        "entries": serialize_docs(docs),
        "total": total
    }

@api_router.post("/guestbook", response_model=Guestbook)
async def create_guestbook_entry(entry_data: GuestbookCreate):
    """Add new guestbook entry"""
    entry = Guestbook(**entry_data.dict())
    result = await guestbook_collection.insert_one(entry.dict(by_alias=True))
    
    created_doc = await guestbook_collection.find_one({"_id": result.inserted_id})
    return serialize_doc(created_doc)

# Contact/QSL Request Endpoints
@api_router.post("/contact", response_model=ContactResponse)
async def create_contact_request(contact_data: ContactRequestCreate):
    """Submit contact form or QSL request"""
    contact_request = ContactRequest(**contact_data.dict())
    result = await contact_requests_collection.insert_one(contact_request.dict(by_alias=True))
    
    return ContactResponse(
        success=True,
        message="Message sent successfully! We will reply within 24 hours.",
        id=str(result.inserted_id)
    )

@api_router.get("/contact-requests", response_model=List[ContactRequest])
async def get_contact_requests(limit: int = Query(50, ge=1, le=100)):
    """Get contact requests (admin endpoint)"""
    docs = await contact_requests_collection.find().sort("created_at", -1).limit(limit).to_list(limit)
    return serialize_docs(docs)

# Station Status Endpoints
@api_router.get("/status", response_model=StationStatusInfo)
async def get_station_status():
    """Get current station status"""
    station_doc = await station_collection.find_one({"callsign": "4K6AG"})
    if not station_doc:
        raise HTTPException(status_code=404, detail="Station not found")
    
    return StationStatusInfo(
        status=station_doc.get("status", "offline"),
        last_updated=station_doc.get("updated_at", datetime.utcnow()),
        frequency=station_doc.get("frequency"),
        mode=station_doc.get("mode")
    )

@api_router.put("/status", response_model=StationStatusInfo)
async def update_station_status(status_data: StationStatusUpdate):
    """Update station status"""
    update_data = status_data.dict()
    update_data['updated_at'] = datetime.utcnow()
    
    result = await station_collection.find_one_and_update(
        {"callsign": "4K6AG"},
        {"$set": update_data},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Station not found")
    
    return StationStatusInfo(
        status=result.get("status"),
        last_updated=result.get("updated_at"),
        frequency=result.get("frequency"),
        mode=result.get("mode")
    )

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "4K6AG Radio Station API is running", "version": "1.0.0"}

# Include the router in the main app
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)