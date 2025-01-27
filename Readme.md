# Sports Event Management Platform - Documentation

## 🌟 Overview
A comprehensive platform for managing and participating in sports events, built with MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🔧 Technical Stack
- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)

## 🚀 API Endpoints

### Authentication Routes
```
POST /api/users/register
- Register new user
- Body: { firstName, lastName, email, password }

POST /api/users/login
- User login
- Body: { email, password }
- Returns: { token, user details }
```

### User Routes
```
GET /api/users/profile
- Get user profile
- Headers: Authorization: Bearer {token}

PUT /api/users/profile
- Update user profile
- Headers: Authorization: Bearer {token}
- Body: {
    firstName,
    lastName,
    phone,
    address,
    city,
    state,
    pincode,
    sportsPreferences: {
        indoor: [],
        outdoor: []
    }
}

GET /api/users/registered-events
- Get user's registered events
- Headers: Authorization: Bearer {token}
```

### Event Routes
```
GET /api/events
- Get all events
- Query params: sport, date, location

POST /api/events
- Create new event
- Headers: Authorization: Bearer {token}
- Body: {
    title,
    description,
    sport,
    date,
    time,
    location,
    maxParticipants,
    image
}

GET /api/events/:id
- Get single event details

PUT /api/events/:id
- Update event
- Headers: Authorization: Bearer {token}

DELETE /api/events/:id
- Delete event
- Headers: Authorization: Bearer {token}

POST /api/events/:id/register
- Register for an event
- Headers: Authorization: Bearer {token}

POST /api/events/:id/unregister
- Unregister from an event
- Headers: Authorization: Bearer {token}
```

## 📁 Project Structure

### Frontend Structure
```
Frontend/
├── src/
│   ├── components/
│   │   ├── UserProfileModal.jsx
│   │   ├── SportsPreferenceModal.jsx
│   │   ├── EventCard.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Events.jsx
│   │   └── ...
│   ├── App.jsx
│   └── main.jsx
```

### Backend Structure
```
Backend/
├── src/
│   ├── controllers/
│   │   ├── user.Controller.js
│   │   ├── event.Controller.js
│   │   └── ...
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── ...
│   ├── routes/
│   │   ├── user.routes.js
│   │   ├── event.routes.js
│   │   └── ...
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── ...
│   └── app.js
```

## 💾 Data Models

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  personal: {
    phone: String,
    gender: String,
    dateOfBirth: Date,
    address: String,
    city: String,
    state: String,
    pincode: String
  },
  professional: {
    occupation: String,
    company: String,
    experience: String,
    education: String,
    skills: [String]
  },
  sportsPreferences: {
    indoor: [String],
    outdoor: [String]
  }
}
```

### Event Model
```javascript
{
  title: String,
  description: String,
  sport: String,
  date: Date,
  time: String,
  location: String,
  maxParticipants: Number,
  currentParticipants: Number,
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  image: String,
  status: String
}
```

## 🔐 Authentication Flow
1. User registers/logs in
2. Server validates credentials and returns JWT token
3. Token stored in localStorage as 'userToken'
4. Token sent with each authenticated request in Authorization header

## 🎯 Features
- User authentication and authorization
- Profile management
- Sports preferences management
- Event creation and management
- Event registration/unregistration
- Responsive design
- Real-time participant count
- Image upload for events
- Search and filter events



## 📝 API Response Format
```javascript
Success Response:
{
  success: true,
  message: "Success message",
  data: {} // Optional data
}

Error Response:
{
  success: false,
  message: "Error message",
  error: {} // Optional error details
}
```

## 🔄 State Management
- Local state using React useState
- Props drilling for component communication
- Context API for global state (if implemented)

## 🎨 UI Components
- Custom modals for forms
- Responsive cards for events
- Loading spinners
- Toast notifications
- Form components
- Navigation components

## 🛠️ Setup Instructions
1. Clone repository
2. Install dependencies:
   ```bash
   cd Frontend && npm install
   cd Backend && npm install
   ```
3. Set up environment variables
4. Start servers:
   ```bash
   # Backend
   cd Backend && npm run dev
   
   # Frontend
   cd Frontend && npm run dev
   ```

## 🔍 Error Handling
- Client-side form validation
- Server-side request validation
- JWT token expiration handling
- API error responses
- Toast notifications for user feedback

## 🔒 Security Measures
- Password hashing
- JWT authentication
- Protected routes
- Input sanitization
- CORS configuration
- Rate limiting (if implemented)

Is documentation mein sari important information cover ki gayi hai. Koi specific part ke bare mein aur detail chahiye to batayein!
