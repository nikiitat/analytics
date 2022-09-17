import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/analyticsTest";

mongoose.connect(MONGO_URI, (err) => {
  if (err) {
    console.log("Failed to connect to MongoDB");
    process.exit(1);
  }
  console.log("MongoDB connected!");
});

mongoose.connection.on("error", (err) => {
  console.log(`MongoDB lost connection, reconnecting...`);
});

const gracefulShutdown = () => {
  mongoose.connection.close(() => {
    console.log("App is terminated, exiting");
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
