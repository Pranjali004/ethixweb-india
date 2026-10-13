import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let isConnectedToMongo = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  const isProduction = process.env.NODE_ENV === 'production';

  if (!uri) {
    if (isProduction) {
      console.error('❌ FATAL: MONGODB_URI environment variable is missing in production!');
      console.error('Render instances must be connected to a hosted database (MongoDB Atlas).');
      process.exit(1);
    }
    console.warn('⚠️  MONGODB_URI not specified. Using resilient local store fallback for development.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 7000,
    });
    isConnectedToMongo = true;
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    if (isProduction) {
      console.error(`❌ FATAL: Failed to connect to MongoDB in production: ${error.message}`);
      console.error('Check your MongoDB Atlas connection string, user credentials, and Network Access (IP allowlist).');
      process.exit(1);
    }
    console.warn(`⚠️  MongoDB connection error: ${error.message}`);
    console.warn('ℹ️  Switching to resilient fallback store for development/testing so the server remains operational.');
    isConnectedToMongo = false;
    return false;
  }
}

export function isMongoConnected() {
  return isConnectedToMongo;
}
