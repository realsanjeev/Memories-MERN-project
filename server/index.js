import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';

dotenv.config();

const app = express();

// ✅ Use built-in Express parsers instead of deprecated body-parser
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

const corsOptions = {
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get('/', (req, res) => res.send('API is running.')); // ✅ root route

app.use('/posts', postRoutes);
app.use('/user', userRouter);

const CONNECTION_URL = process.env.MONGODB_SERVER;
const PORT = process.env.PORT || 5000;

// ✅ Attach listeners BEFORE connecting to avoid race conditions
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('MongoDB connected successfully!');
});

db.on('disconnected', () => {
  console.log('MongoDB connection disconnected!');
});

// ✅ Use mongoose.connection.close() — db.close() is deprecated
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to application termination.');
  process.exit(0);
});

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  });