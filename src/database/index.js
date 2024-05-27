import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing!");
}

let cached = global.mongoose || { connection: null, promise: null };

async function connectToDatabase() {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "todo-list-nextjs",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => {
        return mongoose;
      })
      .catch((error) => {
        console.log("Error connecting to MongoDB database:", error.message);
      });
  }

  cached.connection = await cached.promise;
  return cached.connection;
}

export default connectToDatabase;
