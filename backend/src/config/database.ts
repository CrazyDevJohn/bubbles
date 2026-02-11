import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI as string);
    console.log("Database Connected!");
  } catch (error) {
    console.log("Database Connection error " + error);
    // process.exit(1);
  }
};

export default connectToDatabase;
