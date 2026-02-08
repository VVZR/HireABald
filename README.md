# HireABald API

Platform for booking bald people for your events and special occasions.

## Project Overview

HireABald is a RESTful API that allows users to book bald individuals for various events. The platform handles user authentication, profile management, and booking operations with external weather API integration to help plan outdoor events.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Joi Validation

## Features

- User registration and authentication
- JWT-based authorization
- Profile management
- Booking system with multiple bald types
- Weather API integration for event planning
- Input validation and error handling

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation Steps

1. Clone the repository
```bash
git clone <repository-url>
cd hireabald
```

2. Install dependencies
```bash
npm install
```

3. Create .env file
```bash
cp .env.example .env
```

4. Configure environment variables in .env
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hireabald
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start the server
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Routes (Public)

#### Register User
- **Endpoint:** `POST /api/auth/register`
- **Access:** Public
- **Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### Login User
- **Endpoint:** `POST /api/auth/login`
- **Access:** Public
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### User Routes (Private)

All user routes require Bearer token in Authorization header:
```
Authorization: Bearer <token>
```

#### Get User Profile
- **Endpoint:** `GET /api/users/profile`
- **Access:** Private
- **Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update User Profile
- **Endpoint:** `PUT /api/users/profile`
- **Access:** Private
- **Body:**
```json
{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

### Booking Routes (Private)

#### Create Booking
- **Endpoint:** `POST /api/bookings`
- **Access:** Private
- **Body:**
```json
{
  "baldType": "fully-bald",
  "eventType": "Wedding",
  "location": "New York",
  "date": "2024-12-31",
  "duration": 4,
  "description": "Need a bald person for wedding ceremony"
}
```
- **Bald Types:** `fully-bald`, `shiny-bald`, `tactical-bald`, `monk-bald`

#### Get All User Bookings
- **Endpoint:** `GET /api/bookings`
- **Access:** Private
- **Response:**
```json
{
  "success": true,
  "count": 2,
  "bookings": [...]
}
```

#### Get Single Booking
- **Endpoint:** `GET /api/bookings/:id`
- **Access:** Private
- **Response:**
```json
{
  "success": true,
  "booking": {...},
  "weather": {
    "condition": "Sunny",
    "temp": 25
  }
}
```

#### Update Booking
- **Endpoint:** `PUT /api/bookings/:id`
- **Access:** Private
- **Body:** Same as create booking (partial updates allowed)

#### Delete Booking
- **Endpoint:** `DELETE /api/bookings/:id`
- **Access:** Private
- **Response:**
```json
{
  "success": true,
  "message": "Booking deleted"
}
```

## External API Integration

The application integrates with WeatherAPI to provide weather forecasts for booking dates and locations. This helps users plan their events better.

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

Error response format:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Project Structure

```
hireabald/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Booking.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── bookingController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── bookings.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

## Deployment

The application is ready for deployment on platforms like Render, Railway, or Replit.

### Deployment Steps:

1. Ensure all environment variables are set on your platform
2. Set `MONGODB_URI` to your MongoDB Atlas connection string
3. Set `NODE_ENV` to `production`
4. Deploy the application

### Environment Variables for Production:
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRE`
- `NODE_ENV`

