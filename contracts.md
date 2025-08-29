# API Contracts для сайта радиостанции 4K6AG

## Общая структура API
- Базовый URL: `${REACT_APP_BACKEND_URL}/api`
- Все эндпоинты возвращают JSON
- Используется стандартные HTTP статус коды

## 1. Управление контентом станции

### GET /api/station
**Описание:** Получение основной информации о станции
**Ответ:**
```json
{
  "callsign": "4K6AG",
  "operator": "string",
  "location": "string", 
  "grid": "string",
  "license": "string",
  "status": "online|offline",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### PUT /api/station
**Описание:** Обновление информации о станции
**Тело запроса:** То же что и ответ GET /api/station

## 2. Управление оборудованием

### GET /api/equipment
**Описание:** Получение списка оборудования
**Ответ:**
```json
[
  {
    "id": "string",
    "type": "transceiver|antenna|amplifier|other",
    "name": "string",
    "specs": "string",
    "power": "string",
    "gain": "string", 
    "bands": "string",
    "created_at": "datetime"
  }
]
```

### POST /api/equipment
**Описание:** Добавление нового оборудования
**Тело запроса:** Объект оборудования без id и created_at

### PUT /api/equipment/{id}
**Описание:** Обновление оборудования

### DELETE /api/equipment/{id}
**Описание:** Удаление оборудования

## 3. QSL карточки

### GET /api/qsl-cards
**Описание:** Получение списка QSL карточек
**Ответ:**
```json
[
  {
    "id": "string",
    "image": "string",
    "year": "string", 
    "design": "string",
    "created_at": "datetime"
  }
]
```

### POST /api/qsl-cards
**Описание:** Добавление новой QSL карточки

## 4. Достижения

### GET /api/achievements
**Описание:** Получение списка достижений
**Ответ:**
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string", 
    "year": "string",
    "category": "string",
    "created_at": "datetime"
  }
]
```

### POST /api/achievements
**Описание:** Добавление нового достижения

## 5. Новости

### GET /api/news
**Описание:** Получение списка новостей
**Параметры:** ?limit=10&offset=0
**Ответ:**
```json
{
  "news": [
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "date": "datetime",
      "category": "equipment|contests|general",
      "created_at": "datetime"
    }
  ],
  "total": "number"
}
```

### POST /api/news
**Описание:** Добавление новой новости

## 6. Галерея

### GET /api/gallery
**Описание:** Получение изображений галереи
**Ответ:**
```json
[
  {
    "id": "string",
    "image": "string",
    "title": "string", 
    "description": "string",
    "category": "string",
    "created_at": "datetime"
  }
]
```

### POST /api/gallery
**Описание:** Добавление изображения в галерею

## 7. Гостевая книга

### GET /api/guestbook
**Описание:** Получение записей гостевой книги
**Параметры:** ?limit=20&offset=0
**Ответ:**
```json
{
  "entries": [
    {
      "id": "string",
      "name": "string",
      "callsign": "string", 
      "message": "string",
      "country": "string",
      "date": "datetime",
      "approved": "boolean"
    }
  ],
  "total": "number"
}
```

### POST /api/guestbook
**Описание:** Добавление записи в гостевую книгу
**Тело запроса:**
```json
{
  "name": "string",
  "callsign": "string",
  "message": "string", 
  "country": "string"
}
```

## 8. Контакты/QSL запросы

### POST /api/contact
**Описание:** Отправка контактной формы/QSL запроса
**Тело запроса:**
```json
{
  "name": "string",
  "email": "string", 
  "callsign": "string",
  "message": "string",
  "qsl_request": "boolean",
  "date": "datetime",
  "frequency": "string",
  "mode": "string",
  "rst_sent": "string",
  "rst_received": "string"
}
```

**Ответ:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "id": "string"
}
```

### GET /api/contact-requests
**Описание:** Получение списка контактных запросов (для админки)

## 9. Статус станции

### GET /api/status
**Описание:** Получение текущего статуса станции
**Ответ:**
```json
{
  "status": "online|offline",
  "last_updated": "datetime",
  "frequency": "string",
  "mode": "string"
}
```

### PUT /api/status
**Описание:** Обновление статуса станции

## Интеграция с фронтендом

### Что заменить в моках:
1. **mock.js - mockStationData** → API calls к `/api/station`, `/api/equipment`, etc.
2. **Формы контактов** → POST запросы к `/api/contact`
3. **Статический контент** → Динамические данные из API
4. **Языковые переводы** - остаются статичными на фронтенде

### Стратегия миграции:
1. Создать MongoDB модели для всех сущностей
2. Реализовать CRUD эндпоинты
3. Заменить импорты mock.js на API calls
4. Добавить состояния loading/error в компоненты
5. Реализовать кэширование данных

### Безопасность:
- Валидация всех входных данных
- Rate limiting для форм
- Санитизация HTML контента
- CORS настройки для фронтенда