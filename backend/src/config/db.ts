import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // console.log(process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
      console.error("===== FULL ERROR =====");
  console.error(error);
  // console.error("Message:", error.message);
  // console.error("Name:", error.name);
  // console.error("Reason:", error.reason);
  // console.error("======================");
  process.exit(1);
    
  }
};

export default connectDB;


