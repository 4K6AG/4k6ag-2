import { useState, useEffect } from 'react';

// Custom hook for data fetching with loading and error states
export const useData = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiFunction();
        
        if (isMounted) {
          setData(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.error || err.message || 'An error occurred');
          console.error('Data fetch error:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiFunction();
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'An error occurred');
      console.error('Data refetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

// Hook for station data
export const useStationData = () => {
  return useData(async () => {
    const { stationAPI } = await import('../services/api');
    return stationAPI.getStationInfo();
  });
};

// Hook for equipment data
export const useEquipmentData = () => {
  return useData(async () => {
    const { equipmentAPI } = await import('../services/api');
    return equipmentAPI.getEquipment();
  });
};

// Hook for QSL cards data
export const useQSLCardsData = () => {
  return useData(async () => {
    const { qslAPI } = await import('../services/api');
    return qslAPI.getQSLCards();
  });
};

// Hook for achievements data
export const useAchievementsData = () => {
  return useData(async () => {
    const { achievementsAPI } = await import('../services/api');
    return achievementsAPI.getAchievements();
  });
};

// Hook for news data
export const useNewsData = (limit = 10, offset = 0) => {
  return useData(async () => {
    const { newsAPI } = await import('../services/api');
    return newsAPI.getNews(limit, offset);
  }, [limit, offset]);
};

// Hook for gallery data
export const useGalleryData = () => {
  return useData(async () => {
    const { galleryAPI } = await import('../services/api');
    return galleryAPI.getGallery();
  });
};

// Hook for guestbook data
export const useGuestbookData = (limit = 20, offset = 0) => {
  return useData(async () => {
    const { guestbookAPI } = await import('../services/api');
    return guestbookAPI.getGuestbook(limit, offset);
  }, [limit, offset]);
};

export default useData;