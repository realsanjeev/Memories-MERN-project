# MERN Project - Memories

A full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to create, share, and manage their cherished memories. Features a modern, responsive UI with Google OAuth authentication.

> 💡 **Python Backend Alternative**: Check out [Memories in Flask](https://github.com/realsanjeev/Memories-flask-api-project) for a Python-based backend implementation.

## ✨ Recent Improvements

- 🎨 **Enhanced UI/UX**: Improved post card styling with smooth hover effects and better visual hierarchy
- 📱 **Responsive Design**: Optimized grid layout with proper breakpoints (mobile, tablet, desktop)
- 🐛 **Bug Fixes**: Fixed action type typos, loading states, and state synchronization issues
- 🧹 **Code Quality**: Removed unused imports, fixed ESLint warnings, and improved code organization
- 🎯 **Better Aspect Ratios**: Cards maintain proper proportions across all screen sizes

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher) or Bun
- MongoDB Atlas account OR Docker (for local MongoDB)
- Google OAuth Client ID (for authentication)

### Option 1: Using Docker (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/realsanjeev/Memories-MERN-project.git memories-project
   cd memories-project
   ```

2. **Start MongoDB with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

3. **Set up environment variables:**
   - Client: Copy `client/.env.example` to `client/.env` and add your `REACT_APP_CLIENT_ID`
   - Server: Copy `server/.env.example` to `server/.env` and configure MongoDB connection

4. **Install dependencies and start servers:**
   ```bash
   # Client
   cd client
   npm install  # or: bun install
   npm start    # or: bun run start

   # Server (in a new terminal)
   cd server
   npm install  # or: bun install
   npm start    # or: bun run start
   ```

### Option 2: Using MongoDB Atlas

1. **Clone and navigate:**
   ```bash
   git clone https://github.com/realsanjeev/Memories-MERN-project.git memories-project
   cd memories-project
   ```

2. **Get your server IP (for MongoDB Atlas whitelist):**
   ```bash
   curl icanhazip.com
   ```

3. **Set up client:**
   ```bash
   cd client
   npm install
   ```
   - Update `.env` with your `REACT_APP_CLIENT_ID` for Google Sign-In

4. **Set up server:**
   ```bash
   cd ../server
   npm install
   ```
   - Configure `.env` with your MongoDB Atlas connection string

5. **Start development servers:**
   ```bash
   npm start
   ```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 📁 Project Structure

```
Memories-MERN-project/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── actions/       # Redux actions
│   │   ├── api/           # API calls
│   │   ├── components/    # React components
│   │   ├── constants/     # Action types
│   │   ├── reducers/      # Redux reducers
│   │   └── App.jsx
│   └── package.json
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── index.js
├── docker-compose.yml    # Docker configuration
└── README.md
```

## ✨ Features

- 📝 **CRUD Operations**: Create, read, update, and delete memories
- 🔍 **Search & Filter**: Find memories by title, tags, or content
- 🏷️ **Tagging System**: Organize memories with custom tags
- 🔐 **Authentication**: Secure Google OAuth integration
- 💬 **Comments**: Engage with memories through comments
- ❤️ **Likes**: Show appreciation for memories
- 📱 **Responsive Design**: Optimized for all screen sizes
- 🎨 **Modern UI**: Material-UI components with custom styling

## 🛠️ Technologies Used

### Frontend
- **React** (v18) - UI library
- **Redux** - State management
- **Material-UI** (v5) - Component library
- **Axios** - HTTP client
- **React Router** (v6) - Navigation

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 🎨 Responsive Breakpoints

The application uses the following breakpoints for optimal display:

| Screen Size | Breakpoint | Cards Per Row |
|-------------|------------|---------------|
| Mobile | < 600px | 1 |
| Tablet | 600-960px | 2 |
| Desktop | 960-1280px | 2 |
| Large Desktop | > 1280px | 3 |

## 🔧 Environment Variables

### Client (.env)
```env
REACT_APP_CLIENT_ID=your_google_oauth_client_id
```

### Server (.env)
```env
PORT=5000
CONNECTION_URL=mongodb://localhost:27017/memories
# OR for MongoDB Atlas:
# CONNECTION_URL=mongodb+srv://username:password@cluster.mongodb.net/memories
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (client)
npx kill-port 3000

# Kill process on port 5000 (server)
npx kill-port 5000
```

### MongoDB Connection Issues
- Ensure Docker is running if using Docker Compose
- Check MongoDB Atlas IP whitelist if using Atlas
- Verify connection string in `.env`

### Google OAuth Not Working
- Verify `REACT_APP_CLIENT_ID` is set correctly
- Check Google Cloud Console for authorized origins:
  - http://localhost:3000
  - http://localhost:5000

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

<table>
  <tr>
    <td><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/instagram.png" alt="Instagram" width="50" height="50"></td>
    <td><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/twitter.png" alt="Twitter" width="50" height="50"></td>
    <td><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/github.png" alt="GitHub" width="50" height="50"></td>
    <td><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/linkedin-logo.png" alt="LinkedIn" width="50" height="50"></td>
  </tr>
</table>

## 📄 License

This project is licensed under the [MIT License](LICENSE).
