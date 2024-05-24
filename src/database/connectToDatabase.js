import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "todo-list-nextjs",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on("connected", () => console.log("MongoDB connected"));
    mongoose.connection.on("disconnected", () => console.log("MongoDB disconnected"));
    mongoose.connection.on("error", (error) => {
      console.log("Error after initial MongoDB connection:", error);
    });
  } catch (error) {
    // handle initial connection errors
    console.log("Error connecting to MongoDB database:", error);
  }
}

export default connectToDatabase;
