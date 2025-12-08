import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';

dotenv.config()
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || '*', // Set CLIENT_URL in .env for production
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use("/posts", postRoutes);
app.use("/user", userRouter);

const CONNECTION_URL = process.env.MONGODB_SERVER;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => app.listen(PORT, () => { console.log(`Server is Running in Port ${PORT}`) }))
  .catch((error) => console.log(error.message));

// Access the default connection object
const db = mongoose.connection;

// Event listeners for connection status
db.on('error', (error) => {
  console.error('MongoDB connection error: ', error);
});

db.once('open', () => {
  console.log('MongoDB connected successfully!');
});

db.on('disconnected', () => {
  console.log('MongoDB connection disconnected!');
});

// Handle process termination
process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed due to application termination');
    process.exit(0);
  });
});
