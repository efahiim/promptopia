import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Using existing connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: process.env.MONGODB_DB,
    });

    isConnected = true;
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};
