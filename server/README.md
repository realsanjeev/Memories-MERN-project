# Memories - Server (Backend)

Express.js backend API for the Memories application, featuring MongoDB database, JWT authentication, and RESTful endpoints.

## 🚀 Quick Start

```bash
# Install dependencies
npm install
# or
bun install

# Set up environment variables
cp .env.example .env
# Configure your MongoDB connection

# Start development server
npm start
# or
bun run start
```

The server will run on [http://localhost:5000](http://localhost:5000)

## 📁 Project Structure

```
server/
├── controllers/        # Route handlers
│   ├── posts.js       # Post CRUD operations
│   └── user.js        # Authentication logic
├── middleware/        # Custom middleware
│   └── auth.js        # JWT verification
├── models/           # Mongoose schemas
│   ├── postMessage.js # Post model
│   └── user.js        # User model
├── routes/           # API routes
│   ├── posts.js      # Post endpoints
│   └── users.js      # Auth endpoints
├── .env.example      # Environment template
├── index.js          # Server entry point
└── package.json
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/signin` | User login | ❌ |
| POST | `/user/signup` | User registration | ❌ |

**Request Body (signup):**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}
```

**Response:**
```json
{
  "result": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

### Posts

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/posts?page=1` | Get paginated posts | ❌ |
| GET | `/posts/:id` | Get single post | ❌ |
| GET | `/posts/search?searchQuery=...&tags=...` | Search posts | ❌ |
| POST | `/posts` | Create new post | ✅ |
| PATCH | `/posts/:id` | Update post | ✅ |
| DELETE | `/posts/:id` | Delete post | ✅ |
| PATCH | `/posts/:id/likePost` | Like/Unlike post | ✅ |
| POST | `/posts/:id/commentPost` | Add comment | ✅ |

**Create Post Request:**
```json
{
  "title": "My Memory",
  "message": "This is a great memory!",
  "tags": ["travel", "adventure"],
  "selectedFile": "base64_encoded_image"
}
```

## 🏗️ Architecture

### MVC Pattern

```
┌──────────┐      ┌─────────────┐      ┌─────────┐      ┌──────────┐
│  Routes  │─────▶│ Controllers │─────▶│  Models │─────▶│ Database │
└──────────┘      └─────────────┘      └─────────┘      └──────────┘
     │                    │
     │                    ▼
     │            ┌──────────────┐
     └───────────▶│  Middleware  │
                  └──────────────┘
```

### Request Flow

1. **Client Request** → Express Router
2. **Middleware** → JWT verification (if required)
3. **Controller** → Business logic
4. **Model** → Database operations
5. **Response** → JSON data back to client

## 🔐 Authentication & Authorization

### JWT Token Structure

The server uses JWT (JSON Web Tokens) for authentication:

```javascript
// Token payload
{
  "email": "user@example.com",
  "id": "user_id",
  "iat": 1234567890,  // Issued at
  "exp": 1234571490   // Expires in 1 hour
}
```

### Google OAuth Flow

1. Client receives Google JWT token
2. Token decoded on client-side
3. User data sent to `/user/signin` or `/user/signup`
4. Server creates/finds user and returns custom JWT
5. Client stores JWT in localStorage
6. JWT sent in `Authorization` header for protected routes

### Middleware Protection

```javascript
// Protected route example
router.patch('/:id', auth, updatePost);

// auth middleware verifies JWT
const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // Verify token and attach userId to request
  req.userId = decodedData?.id;
  next();
};
```

## 💾 Database Models

### Post Model

```javascript
{
  title: String,
  message: String,
  name: String,           // Creator name
  creator: String,        // User ID
  tags: [String],
  selectedFile: String,   // Base64 image
  likes: [String],        // Array of user IDs
  comments: [String],     // Array of comments
  createdAt: Date
}
```

### User Model

```javascript
{
  name: String,
  email: String,
  password: String,       // Hashed with bcrypt
  id: String
}
```

## 🔧 Environment Variables

Create a `.env` file in the server directory:

```env
# Server Configuration
PORT=5000

# MongoDB Connection
CONNECTION_URL=mongodb://localhost:27017/memories
# OR for MongoDB Atlas:
# CONNECTION_URL=mongodb+srv://username:password@cluster.mongodb.net/memories

# JWT Secret (optional, defaults to 'test')
JWT_SECRET=your_secret_key_here
```

## 🐳 Docker Setup

The project includes Docker Compose for local MongoDB:

```bash
# Start MongoDB container
docker-compose up -d

# Stop MongoDB container
docker-compose down

# View logs
docker-compose logs -f
```

**docker-compose.yml:**
```yaml
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
```

## 🛠️ Technologies

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **nodemon** - Development auto-restart

## 📊 Key Features

### Pagination
Posts are paginated with 8 posts per page:
```javascript
const LIMIT = 8;
const startIndex = (page - 1) * LIMIT;
const posts = await PostMessage.find()
  .sort({ _id: -1 })
  .limit(LIMIT)
  .skip(startIndex);
```

### Search Functionality
Search by title or tags:
```javascript
const posts = await PostMessage.find({
  $or: [
    { title: { $regex: searchQuery, $options: 'i' } },
    { tags: { $in: tags.split(',') } }
  ]
});
```

### Like System
Users can like/unlike posts (one like per user):
```javascript
const index = post.likes.findIndex((id) => id === userId);
if (index === -1) {
  post.likes.push(userId);  // Like
} else {
  post.likes = post.likes.filter((id) => id !== userId);  // Unlike
}
```

## 🐛 Common Issues

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
docker ps

# Or if using MongoDB Atlas, verify:
# 1. IP whitelist includes your IP
# 2. Connection string is correct
# 3. Database user has proper permissions
```

### Port 5000 Already in Use
```bash
npx kill-port 5000
```

### CORS Errors
Ensure CORS is properly configured in `index.js`:
```javascript
app.use(cors());
```

## 📚 API Testing

### Using cURL

```bash
# Get all posts
curl http://localhost:5000/posts?page=1

# Create post (requires auth token)
curl -X POST http://localhost:5000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Test","message":"Test message","tags":["test"]}'
```

### Using Postman

1. Import the API endpoints
2. Set `Authorization` header with JWT token
3. Test CRUD operations

## 🚀 Deployment

### Environment Setup
1. Set `CONNECTION_URL` to production MongoDB
2. Set strong `JWT_SECRET`
3. Configure `PORT` if needed
4. Set `NODE_ENV=production`

### Recommended Platforms
- **Heroku** - Easy deployment with MongoDB Atlas
- **Railway** - Modern deployment platform
- **Render** - Free tier available
- **DigitalOcean** - VPS option

---

**Note**: This backend is designed to work with the Memories React frontend running on `http://localhost:3000`