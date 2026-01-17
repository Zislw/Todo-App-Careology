# TODO App - Backend

Node.js backend with TypeScript, Express, and SQL Server for the TODO application.

## Features

- ✅ RESTful API
- ✅ User authentication
- ✅ Task CRUD operations
- ✅ Priority management
- ✅ SQL Server database
- ✅ CORS enabled
- ✅ Environment variables

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (comes with Node.js)
- SQL Server (or SQL Server Express)
- SQL Server Management Studio (SSMS) - optional but recommended

## Database Setup

### Step 1: Create Database

1. Open SQL Server Management Studio (SSMS)

2. Connect to your SQL Server instance

3. Create a new database:
   ```sql
   CREATE DATABASE TodoDB;
   GO
   
   USE TodoDB;
   GO
   ```

### Step 2: Create Tables

Execute the following SQL scripts in order:

#### 1. Create USER Table
```sql
CREATE TABLE [USER](
    uid UNIQUEIDENTIFIER PRIMARY KEY,
    fullName VARCHAR(30),
    email VARCHAR(30),
    password VARCHAR(100),
    isActive BIT DEFAULT(1)
);
GO
```

#### 2. Create PRIORITY Table
```sql
CREATE TABLE [PRIORITY](
    uid UNIQUEIDENTIFIER PRIMARY KEY,
    name VARCHAR(100),
    [priority] INT,
    isActive BIT DEFAULT(1)
);
GO
```

#### 3. Create TASK Table
```sql
CREATE TABLE TASK(
    uid UNIQUEIDENTIFIER PRIMARY KEY,
    title VARCHAR(100),
    dueDate DATETIME,
    userUid UNIQUEIDENTIFIER,
    priorityUid UNIQUEIDENTIFIER,
    isCompleted BIT DEFAULT(0),
    isActive BIT DEFAULT(1),
    FOREIGN KEY (userUid) REFERENCES [USER](uid),
    FOREIGN KEY (priorityUid) REFERENCES [PRIORITY](uid)
);
GO
```

#### 4. Insert Default Priority Values
```sql
INSERT INTO [PRIORITY](uid, name, [priority]) VALUES
(NEWID(), 'high', 1),
(NEWID(), 'medium', 2),
(NEWID(), 'low', 3);
GO
```

### Step 3: Verify Tables

Check that all tables were created successfully:
```sql
SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';
```

You should see: `USER`, `PRIORITY`, and `TASK` tables.

## Installation

1. Navigate to the backend directory:
   ```bash
   cd "c:\נעמי-לימודים\TODO App\back-end"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the backend directory:
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

4. Update the `.env` file with your SQL Server credentials:
   - **DB_SERVER**: Your SQL Server instance name (e.g., `DESKTOP-6RIE3BH` or `localhost`)
   - **DB_USER**: Your SQL Server username
   - **DB_PASSWORD**: Your SQL Server password
   - **DB_DOMAIN**: Your computer/domain name (optional)

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

### Tasks

| Method | Endpoint | Description | Body/Query |
|--------|----------|-------------|------------|
| GET | `/tasks/getAllTasks?userUid={uid}` | Get all tasks for user | Query: `userUid` |
| POST | `/tasks/addTask` | Create new task | `{ title, dueDate, isCompleted, priorityUid, userUid }` |
| PUT | `/tasks/updateTask/:taskUid` | Update task | `{ title, dueDate, isCompleted, priorityUid }` |
| DELETE | `/tasks/deleteTask/:uid` | Delete task | Param: `uid` |

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

### Priorities

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks/priorities` | Get all priorities |

## Project Structure

```
back-end/
├── src/
│   ├── controllers/     # Request handlers
│   │   ├── taskController.ts
│   │   └── userController.ts
│   ├── routes/         # API routes
│   │   ├── taskRoutes.ts
│   │   └── userRoutes.ts
│   ├── db/            # Database connection
│   │   └── connection.ts
│   ├── types/         # TypeScript types
│   │   └── index.ts
│   └── server.ts      # Entry point
├── dist/              # Compiled JavaScript (after build)
├── .env               # Environment variables (create this)
├── .env.example       # Environment variables example
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
| DB_USER | Database user | sa |
| DB_PASSWORD | Database password | your_password |
| DB_DOMAIN | Domain name | desktop-6rie3bh |
| CORS_ORIGIN | Allowed origin | http://localhost:3000 |

## Testing the API

### Using Browser
Navigate to: [http://localhost:4000](http://localhost:4000)
You should see: "Server is running"

### Using Postman or curl

**Register a user:**
```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get tasks:**
```bash
curl -X GET "http://localhost:4000/tasks/getAllTasks?userUid=YOUR_USER_UID"
```

**Get priorities:**
```bash
curl -X GET http://localhost:4000/tasks/priorities
```

## Troubleshooting

### Database Connection Issues

**1. Check SQL Server is running:**
   - Open SQL Server Configuration Manager
   - Ensure SQL Server service is running
   - If not, start the service

**2. Enable TCP/IP:**
   - Open SQL Server Configuration Manager
   - Go to SQL Server Network Configuration > Protocols
   - Enable TCP/IP protocol
   - Restart SQL Server service

**3. Check authentication mode:**
   - Right-click SQL Server instance in SSMS
   - Properties > Security
   - Ensure "SQL Server and Windows Authentication mode" is selected
   - Restart SQL Server after changing

**4. Verify connection string:**
   - Check your `.env` file has correct values
   - Test connection in SSMS with the same credentials

**5. Check firewall:**
   - Ensure Windows Firewall allows SQL Server
   - Default port: 1433

### Port Already in Use

```bash
# Windows - find and kill process
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Or change port in .env file
PORT=4001
```

### CORS Errors

Make sure `CORS_ORIGIN` in `.env` matches your frontend URL (default: `http://localhost:3000`).

### Common SQL Errors

**"Login failed for user"**
- Check username and password in `.env`
- Verify SQL Server authentication is enabled

**"Cannot open database"**
- Ensure database `TodoDB` exists
- Run the CREATE DATABASE script

**"Invalid object name"**
- Run all CREATE TABLE scripts
- Check table names match (case-sensitive in some configurations)

## Database Schema

### Entity Relationship Diagram

```
USER (1) ----< (N) TASK (N) >---- (1) PRIORITY

USER
├── uid (PK)
├── fullName
├── email
├── password
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
├── priority (1/2/3)
└── isActive
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **mssql** - SQL Server client
- **cors** - CORS middleware
- **dotenv** - Environment variables

## Security Notes

⚠️ **Important for Production:**
- Passwords are currently stored in plain text (for learning purposes)
- For production:
  - Use bcrypt or similar to hash passwords
  - Add JWT tokens for authentication
  - Use HTTPS
  - Add rate limiting
  - Validate and sanitize all inputs
  - Use parameterized queries (already implemented)
  - Don't commit `.env` file to git
  - Use environment-specific configurations

## Learn More

- [Express Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [SQL Server Documentation](https://docs.microsoft.com/en-us/sql/)
- [Node.js mssql Package](https://www.npmjs.com/package/mssql)