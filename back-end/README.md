# TODO App - Backend

Node.js backend with TypeScript, Express, and SQL Server for the TODO application.

## Features

- ✅ RESTful API
- ✅ User authentication with bcrypt password hashing
- ✅ Task CRUD operations
- ✅ Priority management
- ✅ SQL Server database
- ✅ CORS enabled
- ✅ Environment variables
- ✅ Automated database setup

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (comes with Node.js)
- SQL Server (or SQL Server Express) - must be running

**Note:** You do NOT need SQL Server Management Studio (SSMS). The database setup is automated!

## Installation

### 1. Navigate to the backend directory

```bash
cd "c:\נעמי-לימודים\TODO App\back-end"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env` file in the backend root directory:

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

**Update with your SQL Server credentials:**
- **DB_SERVER**: Your SQL Server instance name (e.g., `DESKTOP-6RIE3BH` or `localhost`)
- **DB_USER**: Your SQL Server username
- **DB_PASSWORD**: Your SQL Server password
- **DB_DOMAIN**: Your computer/domain name (optional, can leave as-is)

### 4. Setup Database (Automated!)

Run the automated setup script to create the database and tables:

```bash
npm run setup-db
```

This will:
- ✅ Create the `TodoDB` database
- ✅ Create `USER`, `PRIORITY`, and `TASK` tables
- ✅ Insert default priority values (high, medium, low)
- ✅ Handle everything automatically - no SQL knowledge required!

You should see output like:
```
🔌 Connecting to SQL Server...
✅ Connected!

📦 Creating database TodoDB...
✅ Database ready

👤 Creating USER table...
✅ USER table ready

🏷️  Creating PRIORITY table...
✅ PRIORITY table ready

✅ Creating TASK table...
✅ TASK table ready

📋 Adding default priorities...
✅ Priorities added

🎉 SUCCESS! Database is ready to use!
```

**Note:** This script is safe to run multiple times. It won't overwrite existing data.

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm start
   ```

The server will run on [http://localhost:4000](http://localhost:4000)

## API Endpoints

### Authentication

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/users/register` | Register new user | `{ fullName, email, password }` |
| POST | `/users/login` | Login user | `{ email, password }` |

**Example - Register:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Example - Login:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Tasks (Protected Routes)

All task endpoints require authentication via `x-user-id` header.

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/tasks/getAllTasks/:userUid` | Get all tasks for user | - |
| POST | `/tasks/addTask` | Create new task | `{ title, dueDate, isCompleted, priorityUid, userUid }` |
| PUT | `/tasks/updateTask/:taskUid` | Update task | `{ title, dueDate, isCompleted, priorityUid }` |
| DELETE | `/tasks/deleteTask/:taskUid` | Delete task | - |
| GET | `/tasks/priorities` | Get all priorities | - |

**Example - Add Task:**
```json
{
  "title": "Complete project",
  "dueDate": "2024-12-31",
  "isCompleted": false,
  "priorityUid": "priority-uid-from-db",
  "userUid": "user-uid-from-login"
}
```

## Authentication & Security

### Password Security
- ✅ Passwords are hashed using **bcrypt** with 10 salt rounds
- ✅ Never stored in plain text
- ✅ Securely compared during login

### Protected Routes
All `/tasks/*` endpoints require authentication via `x-user-id` header:

```bash
curl -X GET "http://localhost:4000/tasks/getAllTasks/USER_UID" \
  -H "x-user-id: USER_UID_HERE"
```

### Registration Process
1. User submits email and password
2. Backend hashes password with bcrypt
3. User record created with hashed password
4. User ID returned for future requests

### Login Process
1. User submits email and password
2. Backend retrieves hashed password from database
3. bcrypt compares submitted password with stored hash
4. On success, returns user ID
5. Frontend stores user ID for authenticated requests

### Security Notes
- ✅ Passwords hashed with bcrypt (10 salt rounds)
- ✅ User validation on protected routes
- ✅ No passwords in API responses
- ✅ Parameterized SQL queries prevent injection
- ⚠️ For production: Add session management or JWT tokens
- ⚠️ For production: Enable HTTPS
- ⚠️ For production: Add rate limiting

## Project Structure

```
back-end/
├── src/
│   ├── controllers/         # Request handlers
│   │   ├── taskController.ts
│   │   └── userController.ts
│   ├── routes/             # API routes
│   │   ├── taskRoutes.ts
│   │   └── userRoutes.ts
│   ├── middleware/         # Custom middleware
│   │   └── authMiddleware.ts
│   ├── db/                # Database
│   │   ├── connection.ts   # DB connection
│   │   └── setup-db.ts     # Automated DB setup
│   └── server.ts          # Entry point
├── dist/                  # Compiled JavaScript (after build)
├── .env                   # Environment variables (create this)
├── .env.example           # Environment variables example
├── package.json
└── tsconfig.json
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 4000 |
| NODE_ENV | Environment | development |
| DB_SERVER | SQL Server name | DESKTOP-6RIE3BH |
| DB_DATABASE | Database name | TodoDB |
| DB_USER | Database user | your_username |
| DB_PASSWORD | Database password | your_password |
| DB_DOMAIN | Domain name | desktop-6rie3bh |
| CORS_ORIGIN | Allowed origin | http://localhost:3000 |

## Database Schema

The automated setup creates the following schema:

### Entity Relationship Diagram

```
USER (1) ----< (N) TASK (N) >---- (1) PRIORITY

USER
├── uid (PK, UNIQUEIDENTIFIER)
├── fullName (VARCHAR(30))
├── email (VARCHAR(30), UNIQUE)
├── password (VARCHAR(100), bcrypt hashed)
└── isActive (BIT, default 1)

TASK
├── uid (PK, UNIQUEIDENTIFIER)
├── title (VARCHAR(100))
├── dueDate (DATETIME)
├── userUid (FK -> USER.uid)
├── priorityUid (FK -> PRIORITY.uid)
├── isCompleted (BIT, default 0)
└── isActive (BIT, default 1)

PRIORITY
├── uid (PK, UNIQUEIDENTIFIER)
├── name (VARCHAR(100): high/medium/low)
└── isActive (BIT, default 1)
```

## Testing the API

### Using curl

**Register a user:**
```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d "{\"fullName\":\"John Doe\",\"email\":\"john@example.com\",\"password\":\"password123\"}"
```

**Login:**
```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"john@example.com\",\"password\":\"password123\"}"
```

**Get tasks:**
```bash
curl -X GET "http://localhost:4000/tasks/getAllTasks/YOUR_USER_UID" \
  -H "x-user-id: YOUR_USER_UID"
```

**Get priorities:**
```bash
curl -X GET http://localhost:4000/tasks/priorities \
  -H "x-user-id: YOUR_USER_UID"
```

## Troubleshooting

### Database Setup Issues

**Error: "Failed to connect to database"**

1. **Check SQL Server is running:**
   - Open Services (Win + R, type `services.msc`)
   - Find "SQL Server" service
   - Ensure it's running, if not, start it

2. **Verify connection details:**
   - Check `.env` file has correct server name
   - Test connection: `sqlcmd -S YOUR_SERVER_NAME -U YOUR_USER -P YOUR_PASSWORD`

3. **Enable TCP/IP (if needed):**
   - Open SQL Server Configuration Manager
   - Go to SQL Server Network Configuration > Protocols
   - Enable TCP/IP
   - Restart SQL Server service

**Error: "Login failed for user"**
- Verify username and password in `.env` file
- Ensure SQL Server authentication is enabled (not just Windows auth)

**Port Already in Use**

```bash
# Windows - find and kill process using port 4000
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Or change PORT in .env file
PORT=4001
```

**CORS Errors**

Make sure `CORS_ORIGIN` in `.env` matches your frontend URL (default: `http://localhost:3000`).

### Resetting the Database

If you need to start fresh, run:

```bash
npm run setup-db
```

The script is idempotent - it won't duplicate data if run multiple times.

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Development | `npm run dev` | Run with hot reload (ts-node) |
| Build | `npm run build` | Compile TypeScript to JavaScript |
| Production | `npm start` | Run compiled code |
| **Setup DB** | `npm run setup-db` | **Create database and tables** |

## Technologies Used

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **mssql** - SQL Server client
- **bcrypt** - Password hashing
- **cors** - CORS middleware
- **dotenv** - Environment variables

## Next Steps

After setting up the backend:

1. ✅ Database is ready
2. Start the backend: `npm run dev`
3. Setup the frontend (see `../front-end/README.md`)
4. Register a user and start creating tasks!

## Support

If you encounter issues:
1. Check the Troubleshooting section above
2. Verify SQL Server is running
3. Check `.env` configuration
4. Review console logs for error details
