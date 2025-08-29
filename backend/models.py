from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

# Enums
class StationStatus(str, Enum):
    online = "online"
    offline = "offline"

class EquipmentType(str, Enum):
    transceiver = "transceiver"
    antenna = "antenna"
    amplifier = "amplifier"
    other = "other"

class NewsCategory(str, Enum):
    equipment = "equipment"
    contests = "contests"
    general = "general"

# Base Models
class BaseDocument(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True

# Station Information
class StationInfo(BaseDocument):
    callsign: str = "4K6AG"
    operator: str
    location: str
    grid: str
    license: str
    status: StationStatus = StationStatus.online

class StationInfoCreate(BaseModel):
    operator: str
    location: str
    grid: str
    license: str
    status: StationStatus = StationStatus.online

class StationInfoUpdate(BaseModel):
    operator: Optional[str] = None
    location: Optional[str] = None
    grid: Optional[str] = None
    license: Optional[str] = None
    status: Optional[StationStatus] = None

# Equipment
class Equipment(BaseDocument):
    type: EquipmentType
    name: str
    specs: str
    power: Optional[str] = None
    gain: Optional[str] = None
    bands: Optional[str] = None

class EquipmentCreate(BaseModel):
    type: EquipmentType
    name: str
    specs: str
    power: Optional[str] = None
    gain: Optional[str] = None
    bands: Optional[str] = None

class EquipmentUpdate(BaseModel):
    type: Optional[EquipmentType] = None
    name: Optional[str] = None
    specs: Optional[str] = None
    power: Optional[str] = None
    gain: Optional[str] = None
    bands: Optional[str] = None

# QSL Cards
class QSLCard(BaseDocument):
    image: str
    year: str
    design: str

class QSLCardCreate(BaseModel):
    image: str
    year: str
    design: str

# Achievements
class Achievement(BaseDocument):
    title: str
    description: str
    year: str
    category: Optional[str] = None

class AchievementCreate(BaseModel):
    title: str
    description: str
    year: str
    category: Optional[str] = None

# News
class News(BaseDocument):
    title: str
    content: str
    date: datetime = Field(default_factory=datetime.utcnow)
    category: NewsCategory = NewsCategory.general

class NewsCreate(BaseModel):
    title: str
    content: str
    date: Optional[datetime] = None
    category: NewsCategory = NewsCategory.general

class NewsResponse(BaseModel):
    news: List[News]
    total: int

# Gallery
class Gallery(BaseDocument):
    image: str
    title: str
    description: str
    category: Optional[str] = None

class GalleryCreate(BaseModel):
    image: str
    title: str
    description: str
    category: Optional[str] = None

# Guestbook
class Guestbook(BaseDocument):
    name: str
    callsign: Optional[str] = None
    message: str
    country: Optional[str] = None
    date: datetime = Field(default_factory=datetime.utcnow)
    approved: bool = True

class GuestbookCreate(BaseModel):
    name: str
    callsign: Optional[str] = None
    message: str
    country: Optional[str] = None

class GuestbookResponse(BaseModel):
    entries: List[Guestbook]
    total: int

# Contact/QSL Requests
class ContactRequest(BaseDocument):
    name: str
    email: str
    callsign: Optional[str] = None
    message: str
    qsl_request: bool = False
    date: Optional[datetime] = None
    frequency: Optional[str] = None
    mode: Optional[str] = None
    rst_sent: Optional[str] = None
    rst_received: Optional[str] = None

class ContactRequestCreate(BaseModel):
    name: str
    email: str
    callsign: Optional[str] = None
    message: str
    qsl_request: bool = False
    date: Optional[datetime] = None
    frequency: Optional[str] = None
    mode: Optional[str] = None
    rst_sent: Optional[str] = None
    rst_received: Optional[str] = None

class ContactResponse(BaseModel):
    success: bool
    message: str
    id: str

# Station Status
class StationStatusInfo(BaseModel):
    status: StationStatus
    last_updated: datetime = Field(default_factory=datetime.utcnow)
    frequency: Optional[str] = None
    mode: Optional[str] = None

class StationStatusUpdate(BaseModel):
    status: StationStatus
    frequency: Optional[str] = None
    mode: Optional[str] = None

# Response Models
class SuccessResponse(BaseModel):
    success: bool = True
    message: str
    data: Optional[Dict[str, Any]] = None

class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    details: Optional[Dict[str, Any]] = None