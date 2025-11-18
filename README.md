# School Admin Portal

A minimal admin portal for managing school operations including teachers, subjects, classes, exams, assignments, results, attendance, and announcements.

## Features

- Admin-only authentication
- Teachers Management
- Subjects Management
- Classes Management (Timetable)
- Exams Management
- Assignments Management
- Results Management
- Attendance Management
- Announcements

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**
- **MongoDB** (running locally on port 27017)

## Installation

### 1. Clone the repository

```bash
git clone git@github.com:Vishanth21/school-admin-portal.git
cd school-admin-portal
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

## Running the Application

### Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On Linux/Mac
sudo systemctl start mongod

# Or if installed via Homebrew (Mac)
brew services start mongodb-community

# On Windows
net start MongoDB
```

### Start the Backend Server

```bash
cd server
npm start
```

The server will start on `http://localhost:5001`

### Start the Frontend Client

Open a new terminal window:

```bash
cd client
npm start
```

The client will start on `http://localhost:3000` and automatically open in your browser.

## Default Login Credentials

After starting the server, a default admin user is automatically created:

- **Email:** `admin@school.com`
- **Password:** `password123`
- **Role:** Admin

## Building for Production

### Build the Client

```bash
cd client
npm run build
```

This creates an optimized production build in the `client/build` directory.

### Run Production Server

```bash
cd server
npm start
```

## Project Structure

```
school-admin-portal/
├── client/                 # React frontend application
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json       # Client dependencies
├── server/                # Express backend server
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── server.js         # Server entry point
│   └── package.json      # Server dependencies
└── .gitignore            # Git ignore rules
```

## Environment Variables

### Server Environment Variables

Create a `.env` file in the `server` directory (optional):

```env
PORT=5001
JWT_SECRET=your_secret_key_here
MONGODB_URL=mongodb://localhost:27017
DB_NAME=school_portal
```

### Client Environment Variables

Create a `.env` file in the `client` directory (optional):

```env
REACT_APP_API_URL=http://localhost:5001
```

## API Endpoints

- `POST /api/auth/login` - Admin login
- `POST /api/auth/signup` - Admin signup
- `GET /api/test` - Test endpoint
- `GET /api/users` - Get all users (for testing)

## Technologies Used

### Frontend
- React 18.2.0
- React Scripts 5.0.1

### Backend
- Node.js
- Express 4.21.2
- MongoDB 4.17.2
- bcryptjs 2.4.3
- jsonwebtoken 9.0.2
- cors 2.8.5

## Troubleshooting

### MongoDB Connection Error

If you see a MongoDB connection error:
1. Ensure MongoDB is installed and running
2. Check if MongoDB is running on port 27017
3. Verify the connection string in `server/server.js`

### Port Already in Use

If port 5001 (server) or 3000 (client) is already in use:
- Change the port in `server/server.js` (PORT variable)
- For client, set `PORT=3001 npm start` (or any other port)

### CORS Errors

If you encounter CORS errors:
- Ensure the backend server is running
- Check that the API URL in client matches the server URL
- Verify CORS is enabled in `server/server.js`

## License

This project is for educational purposes.