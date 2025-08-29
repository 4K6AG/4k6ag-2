// Mock data for 4K6AG Amateur Radio Station Website

export const mockTranslations = {
  az: {
    // Navigation
    nav: {
      home: "Ana Səhifə",
      about: "Haqqında",
      equipment: "Avadanlıq", 
      qsl: "QSL Kartları",
      contacts: "Əlaqə",
      gallery: "Qalereya",
      achievements: "Nailiyyətlər",
      news: "Xəbərlər",
      technical: "Texniki Məlumat",
      guestbook: "Qonaq Kitabı"
    },
    // Hero section
    hero: {
      title: "4K6AG",
      subtitle: "Azərbaycan Radioamatör Stansiyası", 
      description: "Qədim Azərbaycan torpağından dünyaya səs verən radioamatör stansiyası",
      status: "Stansiya Statusu",
      online: "Efirdə",
      offline: "Efirdən Kənar"
    },
    // About section
    about: {
      title: "Stansiya Haqqında",
      description: "4K6AG radioamatör stansiyası Azərbaycanda yerləşir və dünya radioamatörləri ilə əlaqə qurur.",
      operator: "Operator",
      location: "Yerləşdiyim yer", 
      grid: "Grid Kvadratı",
      license: "Lisenziya Klass"
    },
    // Equipment
    equipment: {
      title: "Avadanlıqlarımız",
      transceiver: "Transiver",
      antenna: "Antenna",
      power: "Güc",
      bands: "Diapazonlar"
    },
    // QSL
    qsl: {
      title: "QSL Kartları",
      request: "QSL Sorğusu",
      gallery: "QSL Qalereya",
      info: "QSL məlumatları və təsdiq prosesi"
    },
    // Contact form
    contact: {
      title: "Əlaqə",
      name: "Ad",
      email: "E-poçt",
      callsign: "Çağırış işarəsi", 
      message: "Mesaj",
      submit: "Göndər",
      qslRequest: "QSL Sorğusu"
    },
    // Footer
    footer: {
      copyright: "Müəllif hüquqları © 2025 4K6AG. Bütün hüquqlar qorunur.",
      contact: "Əlaqə: 4k6ag@example.com"
    }
  },
  ru: {
    // Navigation  
    nav: {
      home: "Главная",
      about: "О станции", 
      equipment: "Оборудование",
      qsl: "QSL Карточки", 
      contacts: "Контакты",
      gallery: "Галерея",
      achievements: "Достижения",
      news: "Новости", 
      technical: "Техническая информация",
      guestbook: "Гостевая книга"
    },
    // Hero section
    hero: {
      title: "4K6AG",
      subtitle: "Азербайджанская радиолюбительская станция",
      description: "Радиолюбительская станция, вещающая в мир с древней азербайджанской земли", 
      status: "Статус станции",
      online: "В эфире", 
      offline: "Не в эфире"
    },
    // About section
    about: {
      title: "О станции",
      description: "Радиолюбительская станция 4K6AG расположена в Азербайджане и поддерживает связь с радиолюбителями всего мира.",
      operator: "Оператор",
      location: "Местоположение",
      grid: "Grid локатор", 
      license: "Класс лицензии"
    },
    // Equipment
    equipment: {
      title: "Наше оборудование", 
      transceiver: "Трансивер",
      antenna: "Антенна",
      power: "Мощность", 
      bands: "Диапазоны"
    },
    // QSL
    qsl: {
      title: "QSL Карточки",
      request: "Запрос QSL",
      gallery: "Галерея QSL", 
      info: "Информация о QSL и процесс подтверждения"
    },
    // Contact form
    contact: {
      title: "Контакты",
      name: "Имя",
      email: "E-mail", 
      callsign: "Позывной",
      message: "Сообщение",
      submit: "Отправить",
      qslRequest: "Запрос QSL"
    },
    // Footer
    footer: {
      copyright: "© 2025 4K6AG. Все права защищены.", 
      contact: "Контакт: 4k6ag@example.com"
    }
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About",
      equipment: "Equipment", 
      qsl: "QSL Cards",
      contacts: "Contacts", 
      gallery: "Gallery",
      achievements: "Achievements",
      news: "News",
      technical: "Technical Info",
      guestbook: "Guestbook"
    },
    // Hero section  
    hero: {
      title: "4K6AG",
      subtitle: "Azerbaijan Amateur Radio Station",
      description: "Amateur radio station broadcasting to the world from ancient Azerbaijan land",
      status: "Station Status", 
      online: "On Air",
      offline: "Off Air"
    },
    // About section
    about: {
      title: "About Station",
      description: "Amateur radio station 4K6AG is located in Azerbaijan and maintains contact with amateur radio operators worldwide.",
      operator: "Operator", 
      location: "Location",
      grid: "Grid Square",
      license: "License Class" 
    },
    // Equipment
    equipment: {
      title: "Our Equipment",
      transceiver: "Transceiver", 
      antenna: "Antenna",
      power: "Power",
      bands: "Bands"
    },
    // QSL
    qsl: {
      title: "QSL Cards", 
      request: "QSL Request",
      gallery: "QSL Gallery",
      info: "QSL information and confirmation process"
    },
    // Contact form
    contact: {
      title: "Contacts",
      name: "Name", 
      email: "Email",
      callsign: "Callsign",
      message: "Message", 
      submit: "Send",
      qslRequest: "QSL Request"
    },
    // Footer
    footer: {
      copyright: "© 2025 4K6AG. All rights reserved.",
      contact: "Contact: 4k6ag@example.com"
    }
  }
};

export const mockStationData = {
  callsign: "4K6AG",
  operator: "John Doe", 
  location: "Baku, Azerbaijan",
  grid: "LN40AA",
  license: "Extra Class",
  status: "online", // online/offline
  equipment: [
    {
      id: 1,
      type: "transceiver",
      name: "Yaesu FT-991A", 
      specs: "HF/VHF/UHF All Mode Transceiver",
      power: "100W",
      bands: "160-10m, 2m, 70cm"
    },
    {
      id: 2, 
      type: "antenna",
      name: "Hexbeam Antenna",
      specs: "6-Band HF Beam Antenna", 
      gain: "6-8 dBi",
      bands: "20-10m"
    },
    {
      id: 3,
      type: "amplifier", 
      name: "ACOM 1000",
      specs: "HF Linear Amplifier",
      power: "1000W",
      bands: "160-10m"
    }
  ],
  qslCards: [
    {
      id: 1, 
      image: "https://via.placeholder.com/400x250/4a90e2/ffffff?text=4K6AG+QSL",
      year: "2024",
      design: "Baku Flame Towers"
    },
    {
      id: 2,
      image: "https://via.placeholder.com/400x250/50c878/ffffff?text=4K6AG+QSL+2023", 
      year: "2023", 
      design: "Azerbaijan Flag"
    }
  ],
  achievements: [
    {
      id: 1,
      title: "DXCC Honor Roll",
      description: "Worked and confirmed 340+ countries",
      year: "2024"
    },
    {
      id: 2, 
      title: "WAS (Worked All States)",
      description: "Confirmed all 50 US States", 
      year: "2023"
    },
    {
      id: 3,
      title: "WAE (Worked All Europe)", 
      description: "Worked all European countries",
      year: "2023"
    }
  ],
  news: [
    {
      id: 1,
      title: "New Equipment Installation",
      content: "Successfully installed new Hexbeam antenna system for improved DX performance.", 
      date: "2024-01-15",
      category: "equipment"
    },
    {
      id: 2,
      title: "Contest Results", 
      content: "Achieved top 10 position in CQ WW DX Contest 2024 from Azerbaijan.",
      date: "2024-01-10", 
      category: "contests"
    }
  ],
  gallery: [
    {
      id: 1,
      image: "https://via.placeholder.com/600x400/ff6b6b/ffffff?text=Station+Shack",
      title: "Main Operating Position", 
      description: "4K6AG main station setup"
    },
    {
      id: 2,
      image: "https://via.placeholder.com/600x400/4ecdc4/ffffff?text=Antenna+Farm",
      title: "Antenna Farm", 
      description: "HF and VHF antenna systems"
    },
    {
      id: 3,
      image: "https://via.placeholder.com/600x400/45b7d1/ffffff?text=QSL+Collection", 
      title: "QSL Card Collection",
      description: "Part of our QSL card collection"
    }
  ],
  guestbook: [
    {
      id: 1,
      name: "VK3XYZ", 
      callsign: "VK3XYZ",
      message: "Great signal from Azerbaijan! 73s from Australia.",
      date: "2024-01-20",
      country: "Australia"
    },
    {
      id: 2,
      name: "JA1ABC",
      callsign: "JA1ABC", 
      message: "Thanks for the nice QSO on 20m. Hope to work you again soon!",
      date: "2024-01-18",
      country: "Japan"
    }
  ]
};

// Mock function to simulate geolocation language detection
export const detectLanguageByLocation = () => {
  // In real implementation, this would use IP geolocation or browser language
  const languages = ['en', 'ru', 'az'];
  return languages[Math.floor(Math.random() * languages.length)];
};

export default {
  mockTranslations,
  mockStationData, 
  detectLanguageByLocation
};