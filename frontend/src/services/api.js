import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging (optional)
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Station Information API
export const stationAPI = {
  getStationInfo: () => api.get('/station'),
  updateStationInfo: (data) => api.put('/station', data),
  getStationStatus: () => api.get('/status'),
  updateStationStatus: (data) => api.put('/status', data),
};

// Equipment API
export const equipmentAPI = {
  getEquipment: () => api.get('/equipment'),
  createEquipment: (data) => api.post('/equipment', data),
  updateEquipment: (id, data) => api.put(`/equipment/${id}`, data),
  deleteEquipment: (id) => api.delete(`/equipment/${id}`),
};

// QSL Cards API
export const qslAPI = {
  getQSLCards: () => api.get('/qsl-cards'),
  createQSLCard: (data) => api.post('/qsl-cards', data),
};

// Achievements API
export const achievementsAPI = {
  getAchievements: () => api.get('/achievements'),
  createAchievement: (data) => api.post('/achievements', data),
};

// News API
export const newsAPI = {
  getNews: (limit = 10, offset = 0) => api.get(`/news?limit=${limit}&offset=${offset}`),
  createNews: (data) => api.post('/news', data),
};

// Gallery API
export const galleryAPI = {
  getGallery: () => api.get('/gallery'),
  createGalleryItem: (data) => api.post('/gallery', data),
};

// Guestbook API
export const guestbookAPI = {
  getGuestbook: (limit = 20, offset = 0) => api.get(`/guestbook?limit=${limit}&offset=${offset}`),
  createGuestbookEntry: (data) => api.post('/guestbook', data),
};

// Contact API
export const contactAPI = {
  submitContactForm: (data) => api.post('/contact', data),
  getContactRequests: (limit = 50) => api.get(`/contact-requests?limit=${limit}`),
};

// Generic API functions
export const apiService = {
  // GET request with error handling
  async get(endpoint, options = {}) {
    try {
      const response = await api.get(endpoint, options);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.response?.data?.error || error.message };
    }
  },

  // POST request with error handling
  async post(endpoint, data, options = {}) {
    try {
      const response = await api.post(endpoint, data, options);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.response?.data?.error || error.message };
    }
  },

  // PUT request with error handling
  async put(endpoint, data, options = {}) {
    try {
      const response = await api.put(endpoint, data, options);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.response?.data?.error || error.message };
    }
  },

  // DELETE request with error handling
  async delete(endpoint, options = {}) {
    try {
      const response = await api.delete(endpoint, options);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.response?.data?.error || error.message };
    }
  }
};

export default api;