import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // if (!process.env.MONGO_DB_URI) {
  //   console.log("MongoDB URI not found in environment variables");
  //   return;
  // }
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(
      "mongodb+srv://abdullah1816:<mongodb1816>@cluster0.hmixa7q.mongodb.net/mistery-message",
      {}
    );

    console.log(db);
    connection.isConnected = db.connections[0].readyState;

    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;
