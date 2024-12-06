import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined in .env file");
    }

    await mongoose.connect(process.env.DATABASE_URL);

    console.log("Database connection established");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
};

export default connectDB;
