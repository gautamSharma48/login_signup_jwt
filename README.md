## Features

- **Signup API** – Input validation, password hashing, MongoDB storage, duplicate email prevention
- **Login API** – Credential verification, JWT on success
- **JWT middleware** – Verifies `Authorization: Bearer <token>`, allows only authenticated users
- **Protected Get Data API** – Returns current user data (no password or sensitive fields)

## Setup
1. Install dependencies
2. Environment variables
   - Set `MONGODB_URI` and `JWT_SECRET` (required)
   Edit `.env`:
   - `MONGODB_URI` – MongoDB connection string (e.g. `mongodb://localhost:27017/nodejs-auth-api` or Atlas URI)
   - `JWT_SECRET` – Long random string for signing JWTs (e.g. use `openssl rand -hex 32`)
   - Optional: `PORT`, `NODE_ENV`, `JWT_EXPIRES_IN`

3.**Run the server**
   npm start
   npm run dev
   Server runs at `http://localhost:5000` (or your `PORT`).

## API Usage

### 1. Signup

**POST** `/api/auth/signup`

Register a new user. Validates input, hashes password, stores in MongoDB. Returns user + JWT.

**Request body (JSON):**
{
  "name": "Name",
  "email": "Name@example.com",
  "password": "password"
}

**Validation rules:**
- `name`: required, max 100 characters
- `email`: required, valid email format
- `password`: required, min 6 characters

{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { "id": "...", "name": "John Doe", "email": "john@example.com" },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}

### 2. Login

**POST** `/api/auth/login`
Verify email and password; returns user + JWT.

**Request body (JSON):**
{
  "email": "john@example.com",
  "password": "secret123"
}


**Success (200):**
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "id": "...", "name": "John Doe", "email": "john@example.com" },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}

---

### 3. Get current user (Protected)

**GET** `/api/users/getUser`

Returns the authenticated user’s data. **Requires a valid JWT.** Password and other sensitive fields are not returned.

**Headers:**
Authorization: Bearer <your-jwt-token>

**Success (200):**
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
}

---

### 4. Health check
**GET** `/health`
Returns API status (no auth).

{ "success": true, "message": "API is running" }


