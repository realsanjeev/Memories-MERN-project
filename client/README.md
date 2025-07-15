# Memories - Client (Frontend)

React-based frontend for the Memories application, featuring a modern UI with Material-UI components, Redux state management, and Google OAuth authentication.

## 🎨 Recent UI/UX Improvements

- ✨ **Enhanced Post Cards**: Smooth hover effects with elevation changes
- 📱 **Responsive Grid**: Optimized breakpoints for all screen sizes
- 🎯 **Better Aspect Ratios**: Cards maintain proper proportions (min-width: 280px)
- 🐛 **Bug Fixes**: Fixed action types, loading states, and removed unused code
- 🧹 **Code Quality**: Removed ESLint warnings and improved component structure

## 🚀 Quick Start

```bash
# Install dependencies
npm install
# or
bun install

# Set up environment variables
cp .env.example .env
# Add your REACT_APP_CLIENT_ID

# Start development server
npm start
# or
bun run start
```

The app will run on [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
client/
├── public/              # Static files
├── src/
│   ├── actions/        # Redux action creators
│   │   ├── auth.jsx    # Authentication actions
│   │   └── posts.jsx   # Post CRUD actions
│   ├── api/            # API client configuration
│   │   └── index.jsx   # Axios instance & API calls
│   ├── components/     # React components
│   │   ├── Auth/       # Login/Signup components
│   │   ├── Form/       # Post creation/edit form
│   │   ├── Home/       # Home page layout
│   │   ├── Navbar/     # Navigation bar
│   │   ├── Pagination/ # Pagination component
│   │   ├── Posts/      # Post list & card components
│   │   └── PostDetails/# Post detail view
│   ├── constants/      # Action type constants
│   │   └── actionTypes.jsx
│   ├── reducers/       # Redux reducers
│   │   ├── auth.jsx    # Auth state reducer
│   │   ├── posts.jsx   # Posts state reducer
│   │   └── index.jsx   # Root reducer
│   ├── App.jsx         # Main app component
│   └── index.js        # App entry point
└── package.json
```

## 🏗️ Architecture

### Redux State Management

The application uses Redux for centralized state management with the following flow:

```
┌─────────────┐      ┌─────────┐      ┌──────────┐      ┌───────┐
│ Components  │─────▶│ Actions │─────▶│ Reducers │─────▶│ Store │
└─────────────┘      └─────────┘      └──────────┘      └───────┘
       ▲                                                      │
       └──────────────────────────────────────────────────────┘
                    (Subscribe to changes)
```

**Key Concepts:**
- **Actions**: Plain objects describing what happened
- **Action Creators**: Functions that create and dispatch actions
- **Reducers**: Pure functions that update state based on actions
- **Store**: Single source of truth for application state

### API Layer

All API calls are centralized in `src/api/index.jsx` using Axios:

```javascript
// Example API calls
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
```

**Features:**
- Axios interceptor for automatic JWT token attachment
- Centralized error handling
- Clean separation of concerns

## 🎨 Responsive Design

### Breakpoints

| Screen Size | Breakpoint | Grid Columns | Cards Per Row |
|-------------|------------|--------------|---------------|
| Mobile | < 600px | xs={12} | 1 |
| Tablet | 600-960px | sm={6} | 2 |
| Desktop | 960-1280px | md={6} | 2 |
| Large | > 1280px | lg={4} | 3 |

### Card Styling

Post cards feature:
- **Minimum width**: 280px (prevents awkward narrowing)
- **Hover effect**: 8px lift with enhanced shadow
- **Smooth transitions**: Cubic-bezier animation curve
- **Proper aspect ratio**: 16:9 for images

## 🔐 Authentication

Google OAuth integration using `@react-oauth/google`:

```javascript
// GoogleLogin component
<GoogleLogin
  onSuccess={googleSuccess}
  onError={googleError}
/>
```

**Flow:**
1. User clicks "Sign in with Google"
2. Google OAuth popup appears
3. On success, JWT token is decoded
4. User data stored in Redux & localStorage
5. Token attached to all API requests via interceptor

## 🛠️ Technologies

- **React** (v18) - UI library
- **Redux** - State management
- **React Router** (v6) - Client-side routing
- **Material-UI** (v5) - Component library
- **Axios** - HTTP client
- **Moment.js** - Date formatting
- **@react-oauth/google** - Google authentication
- **jwt-decode** - JWT token decoding

## 📝 Key Components

### Posts Component
Displays grid of post cards with loading states and empty states.

### Post Component
Individual post card with:
- Image with 16:9 aspect ratio
- Title, message preview, and tags
- Like button with count
- Edit/Delete buttons (for post creator)
- Hover effects

### Form Component
Create/Edit post form with:
- Title and message inputs
- Tag management with chips
- Image upload (base64)
- Validation

### PostDetails Component
Full post view with:
- Complete post information
- Comment section
- Recommended posts

## 🔧 Environment Variables

Create a `.env` file in the client directory:

```env
REACT_APP_CLIENT_ID=your_google_oauth_client_id_here
```

**Getting Google OAuth Client ID:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins: `http://localhost:3000`

## 🐛 Common Issues

### Port 3000 Already in Use
```bash
npx kill-port 3000
```

### Google OAuth Not Working
- Verify `REACT_APP_CLIENT_ID` is set correctly
- Check authorized origins in Google Cloud Console
- Ensure you're using `http://localhost:3000` (not `127.0.0.1`)

### Redux DevTools Not Working
Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools) for Chrome/Firefox

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Redux Documentation](https://redux.js.org/)
- [Material-UI Documentation](https://mui.com/)
- [React Router Documentation](https://reactrouter.com/)

---

**Note**: This frontend is designed to work with the Memories backend server running on `http://localhost:5000`