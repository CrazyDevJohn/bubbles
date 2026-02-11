import mongoose from "mongoose";

const connectToDatabase = async () => {
  const uri = process.env.DATABASE_URI;
  if (!uri) {
    throw new Error("DATABASE_URI environment variable is not set");
  }
  try {
    await mongoose.connect(uri);
    console.log("Database Connected!");
  } catch (error) {
    console.error("Database Connection error:", error);
    throw error;
    // process.exit(1);
  }
};

export default connectToDatabase;
