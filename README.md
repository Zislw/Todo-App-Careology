# TODO Application

A full-stack TODO application with user authentication, task management, priority levels, and weather integration.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- SQL Server
- npm

### Setup & Run

1. **Clone/Download the project**

2. **Setup Database** (see [back-end/README.md](./back-end/README.md))
   ```sql
   CREATE DATABASE TodoDB;
   -- Run all SQL scripts from backend README
   ```

3. **Setup Backend**
   ```bash
   cd back-end
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   npm start
   ```

4. **Setup Frontend**
   ```bash
   cd front-end
   npm install
   cp .env.example .env
   # Add your Weather API key
   npm start
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
TODO App/
├── front-end/          # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── back-end/           # Node.js backend
│   ├── src/
│   └── package.json
└── README.md
```

## ✨ Features

- 🔐 User Authentication
- ✅ CRUD Operations for Tasks
- 🎯 Priority Levels (High/Medium/Low)
- 🌤️ Weather Integration
- 🔍 Search & Filter
- 📱 Responsive Design
- 💾 SQL Server Database

## 🛠️ Technologies

### Frontend
- React 18
- TypeScript
- Redux + Redux Thunk
- React Router
- Semantic UI React
- Axios
- SCSS

### Backend
- Node.js
- Express
- TypeScript
- SQL Server (mssql)
- CORS
- dotenv

## 📖 Documentation

- [Frontend README](./front-end/README.md)
- [Backend README](./back-end/README.md)

## 🔧 Configuration

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:4000
REACT_APP_WEATHER_API_KEY=your_key_here
REACT_APP_WEATHER_API_URL=https://api.weatherapi.com/v1
```

### Backend (.env)
```env
PORT=4000
DB_SERVER=your_server
DB_DATABASE=TodoDB
DB_USER=your_user
DB_PASSWORD=your_password
CORS_ORIGIN=http://localhost:3000
```

## 🎯 Usage

1. **Register** a new account
2. **Login** with your credentials
3. **Add tasks** with title, due date, and priority
4. **Mark tasks** as complete
5. **Edit or delete** tasks as needed
6. **Search** for specific tasks

## 🐛 Troubleshooting

See detailed troubleshooting guides in:
- [Frontend Troubleshooting](./front-end/README.md#troubleshooting)
- [Backend Troubleshooting](./back-end/README.md#troubleshooting)

## 📝 License

This project is for educational purposes.
