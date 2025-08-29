from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional, Dict, Any
from dotenv import load_dotenv
from pathlib import Path
import os
from datetime import datetime

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Get database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'radio_station')]

# Collections
station_collection = db.station_info
equipment_collection = db.equipment
qsl_cards_collection = db.qsl_cards
achievements_collection = db.achievements
news_collection = db.news
gallery_collection = db.gallery
guestbook_collection = db.guestbook
contact_requests_collection = db.contact_requests

class DatabaseManager:
    @staticmethod
    async def ensure_indexes():
        """Create necessary indexes for better performance"""
        # Create indexes for commonly queried fields
        await news_collection.create_index([("date", -1)])
        await guestbook_collection.create_index([("date", -1)])
        await contact_requests_collection.create_index([("created_at", -1)])
        await equipment_collection.create_index("type")
        await achievements_collection.create_index("year")
        
    @staticmethod
    async def init_sample_data():
        """Initialize database with sample data if empty"""
        
        # Check if station info exists
        station_exists = await station_collection.find_one({"callsign": "4K6AG"})
        if not station_exists:
            from models import StationInfo
            station_data = StationInfo(
                callsign="4K6AG",
                operator="John Doe",
                location="Baku, Azerbaijan", 
                grid="LN40AA",
                license="Extra Class",
                status="online"
            )
            await station_collection.insert_one(station_data.dict(by_alias=True))
        
        # Check if equipment exists
        equipment_exists = await equipment_collection.count_documents({})
        if equipment_exists == 0:
            from models import Equipment
            sample_equipment = [
                Equipment(
                    type="transceiver",
                    name="Yaesu FT-991A",
                    specs="HF/VHF/UHF All Mode Transceiver", 
                    power="100W",
                    bands="160-10m, 2m, 70cm"
                ),
                Equipment(
                    type="antenna", 
                    name="Hexbeam Antenna",
                    specs="6-Band HF Beam Antenna",
                    gain="6-8 dBi",
                    bands="20-10m"
                ),
                Equipment(
                    type="amplifier",
                    name="ACOM 1000", 
                    specs="HF Linear Amplifier",
                    power="1000W",
                    bands="160-10m"
                )
            ]
            
            for equipment in sample_equipment:
                await equipment_collection.insert_one(equipment.dict(by_alias=True))
        
        # Check if QSL cards exist
        qsl_exists = await qsl_cards_collection.count_documents({})
        if qsl_exists == 0:
            from models import QSLCard
            sample_qsl = [
                QSLCard(
                    image="https://via.placeholder.com/400x250/4a90e2/ffffff?text=4K6AG+QSL",
                    year="2024",
                    design="Baku Flame Towers"
                ),
                QSLCard(
                    image="https://via.placeholder.com/400x250/50c878/ffffff?text=4K6AG+QSL+2023",
                    year="2023", 
                    design="Azerbaijan Flag"
                )
            ]
            
            for qsl in sample_qsl:
                await qsl_cards_collection.insert_one(qsl.dict(by_alias=True))
        
        # Check if achievements exist
        achievements_exists = await achievements_collection.count_documents({})
        if achievements_exists == 0:
            from models import Achievement
            sample_achievements = [
                Achievement(
                    title="DXCC Honor Roll",
                    description="Worked and confirmed 340+ countries",
                    year="2024"
                ),
                Achievement(
                    title="WAS (Worked All States)",
                    description="Confirmed all 50 US States",
                    year="2023"
                ),
                Achievement(
                    title="WAE (Worked All Europe)",
                    description="Worked all European countries", 
                    year="2023"
                )
            ]
            
            for achievement in sample_achievements:
                await achievements_collection.insert_one(achievement.dict(by_alias=True))
        
        # Check if news exist
        news_exists = await news_collection.count_documents({})
        if news_exists == 0:
            from models import News
            sample_news = [
                News(
                    title="New Equipment Installation",
                    content="Successfully installed new Hexbeam antenna system for improved DX performance.",
                    date=datetime(2024, 1, 15),
                    category="equipment"
                ),
                News(
                    title="Contest Results",
                    content="Achieved top 10 position in CQ WW DX Contest 2024 from Azerbaijan.",
                    date=datetime(2024, 1, 10),
                    category="contests"
                )
            ]
            
            for news_item in sample_news:
                await news_collection.insert_one(news_item.dict(by_alias=True))
        
        # Check if gallery exists
        gallery_exists = await gallery_collection.count_documents({})
        if gallery_exists == 0:
            from models import Gallery
            sample_gallery = [
                Gallery(
                    image="https://via.placeholder.com/600x400/ff6b6b/ffffff?text=Station+Shack",
                    title="Main Operating Position",
                    description="4K6AG main station setup"
                ),
                Gallery(
                    image="https://via.placeholder.com/600x400/4ecdc4/ffffff?text=Antenna+Farm", 
                    title="Antenna Farm",
                    description="HF and VHF antenna systems"
                ),
                Gallery(
                    image="https://via.placeholder.com/600x400/45b7d1/ffffff?text=QSL+Collection",
                    title="QSL Card Collection", 
                    description="Part of our QSL card collection"
                )
            ]
            
            for gallery_item in sample_gallery:
                await gallery_collection.insert_one(gallery_item.dict(by_alias=True))
        
        # Check if guestbook exists
        guestbook_exists = await guestbook_collection.count_documents({})
        if guestbook_exists == 0:
            from models import Guestbook
            sample_guestbook = [
                Guestbook(
                    name="VK3XYZ",
                    callsign="VK3XYZ", 
                    message="Great signal from Azerbaijan! 73s from Australia.",
                    date=datetime(2024, 1, 20),
                    country="Australia"
                ),
                Guestbook(
                    name="JA1ABC",
                    callsign="JA1ABC",
                    message="Thanks for the nice QSO on 20m. Hope to work you again soon!",
                    date=datetime(2024, 1, 18),
                    country="Japan"
                )
            ]
            
            for entry in sample_guestbook:
                await guestbook_collection.insert_one(entry.dict(by_alias=True))