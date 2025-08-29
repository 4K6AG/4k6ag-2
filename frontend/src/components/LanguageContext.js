import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockTranslations, detectLanguageByLocation } from '../mock';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState(mockTranslations.en);

  useEffect(() => {
    // Auto-detect language based on geolocation (mock implementation)
    const detectedLang = detectLanguageByLocation();
    setCurrentLanguage(detectedLang);
    setTranslations(mockTranslations[detectedLang]);
  }, []);

  const changeLanguage = (lang) => {
    if (mockTranslations[lang]) {
      setCurrentLanguage(lang);
      setTranslations(mockTranslations[lang]);
    }
  };

  const t = (path) => {
    const keys = path.split('.');
    let result = translations;
    for (const key of keys) {
      if (result && typeof result === 'object') {
        result = result[key];
      } else {
        return path; // Return path if translation not found
      }
    }
    return result || path;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      changeLanguage,
      t,
      translations
    }}>
      {children}
    </LanguageContext.Provider>
  );
};