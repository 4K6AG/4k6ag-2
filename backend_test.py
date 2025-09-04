#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for 4K6AG Radio Station
Tests all CRUD operations, pagination, error handling, and data validation
"""

import requests
import json
import uuid
from datetime import datetime
from typing import Dict, Any

# Configuration
BASE_URL = "https://hamradio-app.preview.emergentagent.com/api"
HEADERS = {"Content-Type": "application/json"}

class APITester:
    def __init__(self):
        self.test_results = []
        self.created_ids = []  # Track created items for cleanup
        
    def log_test(self, test_name: str, success: bool, details: str = ""):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        self.test_results.append({
            "test": test_name,
            "status": status,
            "details": details
        })
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
    
    def test_station_info_api(self):
        """Test Station Information API endpoints"""
        print("\n=== Testing Station Information API ===")
        
        # Test GET station info
        try:
            response = requests.get(f"{BASE_URL}/station")
            if response.status_code == 200:
                data = response.json()
                if "callsign" in data and data["callsign"] == "4K6AG":
                    self.log_test("GET /station", True, f"Retrieved station info for {data['callsign']}")
                else:
                    self.log_test("GET /station", False, "Invalid station data structure")
            else:
                self.log_test("GET /station", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("GET /station", False, f"Exception: {str(e)}")
        
        # Test PUT station info update
        try:
            update_data = {
                "operator": "Ruslan Muradov Test",
                "grid_square": "LN40vi"
            }
            response = requests.put(f"{BASE_URL}/station", json=update_data, headers=HEADERS)
            if response.status_code == 200:
                data = response.json()
                if data.get("operator") == "Ruslan Muradov Test":
                    self.log_test("PUT /station", True, "Station info updated successfully")
                else:
                    self.log_test("PUT /station", False, "Update not reflected in response")
            else:
                self.log_test("PUT /station", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("PUT /station", False, f"Exception: {str(e)}")
    
    def test_equipment_api(self):
        """Test Equipment Management API endpoints"""
        print("\n=== Testing Equipment Management API ===")
        
        # Test GET equipment list
        try:
            response = requests.get(f"{BASE_URL}/equipment")
            if response.status_code == 200:
                equipment_list = response.json()
                self.log_test("GET /equipment", True, f"Retrieved {len(equipment_list)} equipment items")
            else:
                self.log_test("GET /equipment", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("GET /equipment", False, f"Exception: {str(e)}")
        
        # Test POST new equipment
        try:
            new_equipment = {
                "name": "Test Transceiver IC-7300",
                "type": "transceiver",
                "specs": "Frequency: 1.8-54 MHz, Power: 100W, Modes: SSB/CW/AM/FM/RTTY/PSK",
                "power": "100W",
                "bands": "1.8-54 MHz"
            }
            response = requests.post(f"{BASE_URL}/equipment", json=new_equipment, headers=HEADERS)
            if response.status_code == 200:
                created_equipment = response.json()
                equipment_id = created_equipment.get("id") or created_equipment.get("_id")
                if equipment_id:
                    self.created_ids.append(("equipment", equipment_id))
                    self.log_test("POST /equipment", True, f"Created equipment with ID: {equipment_id}")
                else:
                    self.log_test("POST /equipment", False, "No ID returned for created equipment")
            else:
                self.log_test("POST /equipment", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("POST /equipment", False, f"Exception: {str(e)}")
        
        # Test PUT equipment update (if we have an ID)
        if self.created_ids and self.created_ids[-1][0] == "equipment":
            try:
                equipment_id = self.created_ids[-1][1]
                update_data = {
                    "specs": "Updated specifications for test equipment"
                }
                response = requests.put(f"{BASE_URL}/equipment/{equipment_id}", json=update_data, headers=HEADERS)
                if response.status_code == 200:
                    self.log_test("PUT /equipment/{id}", True, "Equipment updated successfully")
                else:
                    self.log_test("PUT /equipment/{id}", False, f"HTTP {response.status_code}: {response.text}")
            except Exception as e:
                self.log_test("PUT /equipment/{id}", False, f"Exception: {str(e)}")
        
        # Test DELETE equipment (if we have an ID)
        if self.created_ids and self.created_ids[-1][0] == "equipment":
            try:
                equipment_id = self.created_ids[-1][1]
                response = requests.delete(f"{BASE_URL}/equipment/{equipment_id}")
                if response.status_code == 200:
                    self.log_test("DELETE /equipment/{id}", True, "Equipment deleted successfully")
                    self.created_ids.pop()  # Remove from tracking
                else:
                    self.log_test("DELETE /equipment/{id}", False, f"HTTP {response.status_code}: {response.text}")
            except Exception as e:
                self.log_test("DELETE /equipment/{id}", False, f"Exception: {str(e)}")
    
    def test_qsl_cards_api(self):
        """Test QSL Cards API endpoints"""
        print("\n=== Testing QSL Cards API ===")
        
        # Test GET QSL cards
        try:
            response = requests.get(f"{BASE_URL}/qsl-cards")
            if response.status_code == 200:
                qsl_cards = response.json()
                self.log_test("GET /qsl-cards", True, f"Retrieved {len(qsl_cards)} QSL cards")
            else:
                self.log_test("GET /qsl-cards", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("GET /qsl-cards", False, f"Exception: {str(e)}")
        
        # Test POST new QSL card
        try:
            new_qsl = {
                "year": "2024",
                "design": "Test QSL Card Design",
                "image": "https://example.com/qsl2024.jpg"
            }
            response = requests.post(f"{BASE_URL}/qsl-cards", json=new_qsl, headers=HEADERS)
            if response.status_code == 200:
                created_qsl = response.json()
                qsl_id = created_qsl.get("id") or created_qsl.get("_id")
                if qsl_id:
                    self.created_ids.append(("qsl", qsl_id))
                    self.log_test("POST /qsl-cards", True, f"Created QSL card with ID: {qsl_id}")
                else:
                    self.log_test("POST /qsl-cards", False, "No ID returned for created QSL card")
            else:
                self.log_test("POST /qsl-cards", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("POST /qsl-cards", False, f"Exception: {str(e)}")
    
    def test_contact_api(self):
        """Test Contact Form API"""
        print("\n=== Testing Contact Form API ===")
        
        # Test regular contact form submission
        try:
            contact_data = {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "callsign": "W1ABC",
                "message": "Hello from the API test! This is a regular contact message.",
                "qsl_request": False
            }
            response = requests.post(f"{BASE_URL}/contact", json=contact_data, headers=HEADERS)
            if response.status_code == 200:
                result = response.json()
                if result.get("success"):
                    self.log_test("POST /contact (regular)", True, "Contact form submitted successfully")
                else:
                    self.log_test("POST /contact (regular)", False, "Success flag not set in response")
            else:
                self.log_test("POST /contact (regular)", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("POST /contact (regular)", False, f"Exception: {str(e)}")
        
        # Test QSL request submission
        try:
            qsl_request_data = {
                "name": "Jane Smith",
                "email": "jane.smith@example.com",
                "callsign": "VK2XYZ",
                "message": "QSL request for contact on 20m SSB",
                "qsl_request": True,
                "frequency": "14.205",
                "mode": "SSB",
                "rst_sent": "59",
                "rst_received": "59"
            }
            response = requests.post(f"{BASE_URL}/contact", json=qsl_request_data, headers=HEADERS)
            if response.status_code == 200:
                result = response.json()
                if result.get("success"):
                    self.log_test("POST /contact (QSL request)", True, "QSL request submitted successfully")
                else:
                    self.log_test("POST /contact (QSL request)", False, "Success flag not set in response")
            else:
                self.log_test("POST /contact (QSL request)", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("POST /contact (QSL request)", False, f"Exception: {str(e)}")
    
    def test_news_api(self):
        """Test News API with pagination"""
        print("\n=== Testing News API ===")
        
        # Test GET news with default pagination
        try:
            response = requests.get(f"{BASE_URL}/news")
            if response.status_code == 200:
                news_data = response.json()
                if "news" in news_data and "total" in news_data:
                    self.log_test("GET /news (default pagination)", True, 
                                f"Retrieved {len(news_data['news'])} news items, total: {news_data['total']}")
                else:
                    self.log_test("GET /news (default pagination)", False, "Invalid response structure")
            else:
                self.log_test("GET /news (default pagination)", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("GET /news (default pagination)", False, f"Exception: {str(e)}")
        
        # Test GET news with custom pagination
        try:
            response = requests.get(f"{BASE_URL}/news?limit=5&offset=0")
            if response.status_code == 200:
                news_data = response.json()
                if len(news_data.get("news", [])) <= 5:
                    self.log_test("GET /news (custom pagination)", True, "Pagination working correctly")
                else:
                    self.log_test("GET /news (custom pagination)", False, "Pagination limit not respected")
            else:
                self.log_test("GET /news (custom pagination)", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("GET /news (custom pagination)", False, f"Exception: {str(e)}")
        
        # Test POST new news item
        try:
            news_item = {
                "title": "Test News Article",
                "content": "This is a test news article created during API testing.",
                "author": "API Tester",
                "date": datetime.utcnow().isoformat()
            }
            response = requests.post(f"{BASE_URL}/news", json=news_item, headers=HEADERS)
            if response.status_code == 200:
                created_news = response.json()
                news_id = created_news.get("id") or created_news.get("_id")
                if news_id:
                    self.created_ids.append(("news", news_id))
                    self.log_test("POST /news", True, f"Created news item with ID: {news_id}")
                else:
                    self.log_test("POST /news", False, "No ID returned for created news item")
            else:
                self.log_test("POST /news", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("POST /news", False, f"Exception: {str(e)}")
    
    def test_gallery_api(self):
        """Test Gallery API"""
        print("\n=== Testing Gallery API ===")
        
        # Test GET gallery
        try:
            response = requests.get(f"{BASE_URL}/gallery")
            if response.status_code == 200:
                gallery_items = response.json()
                self.log_test("GET /gallery", True, f"Retrieved {len(gallery_items)} gallery items")
            else:
                self.log_test("GET /gallery", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("GET /gallery", False, f"Exception: {str(e)}")
        
        # Test POST new gallery item
        try:
            gallery_item = {
                "title": "Test Gallery Image",
                "description": "Test image uploaded during API testing",
                "image": "https://example.com/test_image.jpg",
                "category": "equipment"
            }
            response = requests.post(f"{BASE_URL}/gallery", json=gallery_item, headers=HEADERS)
            if response.status_code == 200:
                created_item = response.json()
                gallery_id = created_item.get("id") or created_item.get("_id")
                if gallery_id:
                    self.created_ids.append(("gallery", gallery_id))
                    self.log_test("POST /gallery", True, f"Created gallery item with ID: {gallery_id}")
                else:
                    self.log_test("POST /gallery", False, "No ID returned for created gallery item")
            else:
                self.log_test("POST /gallery", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("POST /gallery", False, f"Exception: {str(e)}")
    
    def test_achievements_api(self):
        """Test Achievements API"""
        print("\n=== Testing Achievements API ===")
        
        # Test GET achievements
        try:
            response = requests.get(f"{BASE_URL}/achievements")
            if response.status_code == 200:
                achievements = response.json()
                self.log_test("GET /achievements", True, f"Retrieved {len(achievements)} achievements")
            else:
                self.log_test("GET /achievements", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("GET /achievements", False, f"Exception: {str(e)}")
        
        # Test POST new achievement
        try:
            achievement = {
                "title": "Test Achievement Award",
                "description": "Test achievement created during API testing",
                "year": "2024",
                "category": "contest"
            }
            response = requests.post(f"{BASE_URL}/achievements", json=achievement, headers=HEADERS)
            if response.status_code == 200:
                created_achievement = response.json()
                achievement_id = created_achievement.get("id") or created_achievement.get("_id")
                if achievement_id:
                    self.created_ids.append(("achievement", achievement_id))
                    self.log_test("POST /achievements", True, f"Created achievement with ID: {achievement_id}")
                else:
                    self.log_test("POST /achievements", False, "No ID returned for created achievement")
            else:
                self.log_test("POST /achievements", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("POST /achievements", False, f"Exception: {str(e)}")
    
    def test_guestbook_api(self):
        """Test Guestbook API with pagination and approval system"""
        print("\n=== Testing Guestbook API ===")
        
        # Test GET guestbook with default pagination
        try:
            response = requests.get(f"{BASE_URL}/guestbook")
            if response.status_code == 200:
                guestbook_data = response.json()
                if "entries" in guestbook_data and "total" in guestbook_data:
                    self.log_test("GET /guestbook (default pagination)", True, 
                                f"Retrieved {len(guestbook_data['entries'])} entries, total: {guestbook_data['total']}")
                else:
                    self.log_test("GET /guestbook (default pagination)", False, "Invalid response structure")
            else:
                self.log_test("GET /guestbook (default pagination)", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("GET /guestbook (default pagination)", False, f"Exception: {str(e)}")
        
        # Test GET guestbook with custom pagination
        try:
            response = requests.get(f"{BASE_URL}/guestbook?limit=10&offset=0")
            if response.status_code == 200:
                guestbook_data = response.json()
                if len(guestbook_data.get("entries", [])) <= 10:
                    self.log_test("GET /guestbook (custom pagination)", True, "Pagination working correctly")
                else:
                    self.log_test("GET /guestbook (custom pagination)", False, "Pagination limit not respected")
            else:
                self.log_test("GET /guestbook (custom pagination)", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("GET /guestbook (custom pagination)", False, f"Exception: {str(e)}")
        
        # Test POST new guestbook entry
        try:
            guestbook_entry = {
                "name": "Test Visitor",
                "callsign": "DL1ABC",
                "country": "Germany",
                "message": "Great station! 73 from Germany. This is a test message from API testing.",
                "email": "test@example.com"
            }
            response = requests.post(f"{BASE_URL}/guestbook", json=guestbook_entry, headers=HEADERS)
            if response.status_code == 200:
                created_entry = response.json()
                entry_id = created_entry.get("id") or created_entry.get("_id")
                if entry_id:
                    self.created_ids.append(("guestbook", entry_id))
                    self.log_test("POST /guestbook", True, f"Created guestbook entry with ID: {entry_id}")
                else:
                    self.log_test("POST /guestbook", False, "No ID returned for created guestbook entry")
            else:
                self.log_test("POST /guestbook", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("POST /guestbook", False, f"Exception: {str(e)}")
    
    def test_status_api(self):
        """Test Station Status API"""
        print("\n=== Testing Station Status API ===")
        
        # Test GET station status
        try:
            response = requests.get(f"{BASE_URL}/status")
            if response.status_code == 200:
                status_data = response.json()
                if "status" in status_data:
                    self.log_test("GET /status", True, f"Station status: {status_data['status']}")
                else:
                    self.log_test("GET /status", False, "Invalid status response structure")
            else:
                self.log_test("GET /status", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("GET /status", False, f"Exception: {str(e)}")
        
        # Test PUT station status update
        try:
            status_update = {
                "status": "online",
                "frequency": "14.205",
                "mode": "SSB"
            }
            response = requests.put(f"{BASE_URL}/status", json=status_update, headers=HEADERS)
            if response.status_code == 200:
                updated_status = response.json()
                if updated_status.get("status") == "online":
                    self.log_test("PUT /status", True, "Station status updated successfully")
                else:
                    self.log_test("PUT /status", False, "Status update not reflected in response")
            else:
                self.log_test("PUT /status", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("PUT /status", False, f"Exception: {str(e)}")
    
    def test_error_handling(self):
        """Test API error handling"""
        print("\n=== Testing Error Handling ===")
        
        # Test 404 for non-existent equipment
        try:
            response = requests.put(f"{BASE_URL}/equipment/nonexistent-id", json={"name": "test"}, headers=HEADERS)
            if response.status_code == 404:
                self.log_test("404 Error Handling", True, "Correctly returns 404 for non-existent equipment")
            else:
                self.log_test("404 Error Handling", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_test("404 Error Handling", False, f"Exception: {str(e)}")
        
        # Test invalid data validation
        try:
            invalid_equipment = {
                "name": "",  # Empty name should fail validation
                "type": "invalid_type"
            }
            response = requests.post(f"{BASE_URL}/equipment", json=invalid_equipment, headers=HEADERS)
            if response.status_code in [400, 422]:  # Validation error
                self.log_test("Data Validation", True, "Correctly validates input data")
            else:
                self.log_test("Data Validation", False, f"Expected validation error, got {response.status_code}")
        except Exception as e:
            self.log_test("Data Validation", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Comprehensive Backend API Tests for 4K6AG Radio Station")
        print(f"Testing API at: {BASE_URL}")
        print("=" * 80)
        
        # Run all test suites
        self.test_station_info_api()
        self.test_equipment_api()
        self.test_qsl_cards_api()
        self.test_contact_api()
        self.test_news_api()
        self.test_gallery_api()
        self.test_achievements_api()
        self.test_guestbook_api()
        self.test_status_api()
        self.test_error_handling()
        
        # Print summary
        print("\n" + "=" * 80)
        print("📊 TEST SUMMARY")
        print("=" * 80)
        
        passed = sum(1 for result in self.test_results if "✅ PASS" in result["status"])
        failed = sum(1 for result in self.test_results if "❌ FAIL" in result["status"])
        
        print(f"Total Tests: {len(self.test_results)}")
        print(f"Passed: {passed}")
        print(f"Failed: {failed}")
        print(f"Success Rate: {(passed/len(self.test_results)*100):.1f}%")
        
        if failed > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if "❌ FAIL" in result["status"]:
                    print(f"  - {result['test']}: {result['details']}")
        
        print("\n✅ PASSED TESTS:")
        for result in self.test_results:
            if "✅ PASS" in result["status"]:
                print(f"  - {result['test']}")
        
        return passed, failed

if __name__ == "__main__":
    tester = APITester()
    passed, failed = tester.run_all_tests()
    
    if failed == 0:
        print("\n🎉 All tests passed! Backend API is working correctly.")
    else:
        print(f"\n⚠️  {failed} test(s) failed. Please check the details above.")