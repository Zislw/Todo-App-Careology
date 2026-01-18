# TODO Application

A full-stack TODO application with user authentication, task management, priority levels, and weather integration.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- SQL Server (must be running)
- npm

**Note:** You do NOT need SQL Server Management Studio (SSMS) - database setup is automated!

### Complete Setup (5 Minutes)

#### 1. Setup Backend

```bash
# Navigate to backend
cd back-end

# Install dependencies
npm install

# Create .env file
copy .env.example .env
# Edit .env with your SQL Server credentials

# Setup database automatically (creates DB + tables)
npm run setup-db

# Start backend server
npm run dev
```

The backend will run on [http://localhost:4000](http://localhost:4000)

#### 2. Setup Frontend

```bash
# Navigate to frontend (open new terminal)
cd front-end

# Install dependencies
npm install

# Create .env file
copy .env.example .env
# Add your Weather API key (optional)

# Start frontend
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000)

#### 3. Ready! 🎉

- Register a new account at [http://localhost:3000](http://localhost:3000)
- Start creating and managing tasks!

## 📁 Project Structure

```
TODO App/
├── front-end/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── store/      # Redux state management
│   │   ├── dtos/       # TypeScript interfaces
│   │   ├── services/   # Weather API
│   │   └── utils/      # Helper functions
│   ├── public/
│   └── package.json
├── back-end/           # Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── db/
│   │   │   ├── connection.ts
│   │   │   └── setup-db.ts    # 🆕 Automated DB setup
│   │   └── server.ts
│   └── package.json
└── README.md
```

## ✨ Features

- 🔐 **User Authentication** - Secure login/register with bcrypt password hashing
- ✅ **Task Management** - Create, read, update, delete tasks
- 🎯 **Priority Levels** - High, medium, low priority tags
- 📅 **Due Dates** - Set and track task deadlines
- 🔍 **Search & Filter** - Find tasks quickly
- ✔️ **Task Completion** - Mark tasks as done
- 🌤️ **Weather Integration** - See weather info for tasks (optional)
- 📱 **Responsive Design** - Works on desktop and mobile
- 💾 **SQL Server Database** - Reliable data persistence
- 🔒 **Protected Routes** - Authenticated API endpoints

## 🛠️ Technologies

### Frontend
- React 18 with TypeScript
- Redux + Redux Thunk (state management)
- React Router (navigation)
- Semantic UI React (components)
- Axios (HTTP client)
- SCSS (styling)

### Backend
- Node.js + Express
- TypeScript
- SQL Server (mssql)
- bcrypt (password hashing)
- CORS
- dotenv

## 📖 Detailed Setup Instructions

### Backend Configuration

Create `back-end/.env`:
```env
PORT=4000
NODE_ENV=development

DB_SERVER=YOUR_SERVER_NAME
DB_DATABASE=TodoDB
DB_USER=YOUR_USERNAME
DB_PASSWORD=YOUR_PASSWORD
DB_DOMAIN=YOUR_DOMAIN

CORS_ORIGIN=http://localhost:3000
```

**Important:** Update `DB_SERVER`, `DB_USER`, and `DB_PASSWORD` with your SQL Server credentials.

### Frontend Configuration

Create `front-end/.env`:
```env
REACT_APP_API_URL=http://localhost:4000
REACT_APP_WEATHER_API_KEY=your_key_here
REACT_APP_WEATHER_API_URL=https://api.weatherapi.com/v1
```

**Weather API (Optional):**
- Get free API key from [weatherapi.com](https://www.weatherapi.com/)
- App works without it, but weather feature will be disabled

### Database Setup (Automated)

The backend includes an automated setup script that creates everything:

```bash
cd back-end
npm run setup-db
```

This creates:
- ✅ TodoDB database
- ✅ USER table (with bcrypt password hashing)
- ✅ PRIORITY table (high, medium, low)
- ✅ TASK table (with foreign keys)

**No SQL knowledge required!** The script handles everything automatically.

**Manual Setup (Alternative):**
If you prefer manual setup or encounter issues, see [back-end/README.md](./back-end/README.md) for SQL scripts.

## 🎯 Usage Guide

### 1. Register / Login
- Create a new account with email and password
- Passwords are securely hashed with bcrypt
- Login to access your tasks

### 2. Add Tasks
- Click "+ Add task" button
- Enter task title (required)
- Set due date (optional)
- Choose priority level (optional)
- Save to create task

### 3. Manage Tasks
- **Complete**: Check the checkbox to mark as done
- **Edit**: Click pencil icon to modify task
- **Delete**: Click trash icon to remove task
- **Search**: Use search bar to find specific tasks

### 4. View Tasks
- **Tasks to do**: Active tasks
- **Tasks done**: Completed tasks
- **Priority badges**: Visual priority indicators
- **Weather info**: Temperature display (if API configured)

## 🔧 Development

### Backend Development
```bash
cd back-end
npm run dev        # Start with hot reload
npm run build      # Compile TypeScript
npm start          # Run production build
npm run setup-db   # Setup/reset database
```

### Frontend Development
```bash
cd front-end
npm start          # Start dev server
npm run build      # Create production build
npm test           # Run tests
```

## 🐛 Troubleshooting

### Backend Issues

**"Failed to connect to database"**
1. Ensure SQL Server is running (check Services)
2. Verify credentials in `.env` file
3. Test connection: `sqlcmd -S SERVER_NAME -U USER -P PASSWORD`

**"Port 4000 already in use"**
```bash
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

**"Login failed for user"**
- Check SQL Server allows SQL authentication (not just Windows)
- Verify username/password are correct

### Frontend Issues

**"Network Error" / Cannot connect to backend**
- Ensure backend is running on port 4000
- Check `REACT_APP_API_URL` in `.env`
- Verify CORS is enabled in backend

**Weather not showing**
- Weather API key may be missing/invalid
- Check `REACT_APP_WEATHER_API_KEY` in `.env`
- App works without weather feature

### Database Issues

**Need to reset database**
```bash
cd back-end
npm run setup-db
```

**Tables not created**
- Check SQL Server is running
- Verify permissions for database creation
- Review console output from `setup-db` script

For more details, see:
- [Frontend Troubleshooting](./front-end/README.md)
- [Backend Troubleshooting](./back-end/README.md)

## 📊 API Endpoints

### Authentication
- `POST /users/register` - Register new user
- `POST /users/login` - Login user

### Tasks (Authenticated)
- `GET /tasks/getAllTasks/:userUid` - Get user's tasks
- `POST /tasks/addTask` - Create new task
- `PUT /tasks/updateTask/:taskUid` - Update task
- `DELETE /tasks/deleteTask/:taskUid` - Delete task
- `GET /tasks/priorities` - Get priority list

See [back-end/README.md](./back-end/README.md) for detailed API documentation.

## 🔒 Security Features

- ✅ bcrypt password hashing (10 salt rounds)
- ✅ Parameterized SQL queries (prevents injection)
- ✅ Protected API routes (require authentication)
- ✅ CORS configured
- ✅ No passwords in API responses
- ⚠️ Production: Add JWT/session tokens
- ⚠️ Production: Enable HTTPS
- ⚠️ Production: Add rate limiting

## 📝 Database Schema

```
USER
├── uid (PK)
├── fullName
├── email (unique)
├── password (bcrypt hashed)
└── isActive

TASK
├── uid (PK)
├── title
├── dueDate
├── userUid (FK -> USER)
├── priorityUid (FK -> PRIORITY)
├── isCompleted
└── isActive

PRIORITY
├── uid (PK)
├── name (high/medium/low)
└── isActive
```

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment
2. Update database connection for production server
3. Build: `npm run build`
4. Deploy `dist` folder to hosting service
5. Set environment variables on hosting platform

### Frontend Deployment
1. Update `REACT_APP_API_URL` to production backend URL
2. Build: `npm run build`
3. Deploy `build` folder to static hosting (Netlify, Vercel, etc.)

## 📄 License

This project is for educational purposes.

## 👥 Contributing

This is a learning project. Feel free to fork and experiment!

## 🙏 Acknowledgments

- Built with React, Node.js, and SQL Server
- UI components from Semantic UI React
- Weather data from WeatherAPI.com
