const mongoose = require("mongoose");

let isConnected = false;

const connectDb = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URL);

    isConnected = db.connections[0].readyState;
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("DB connection failed", err.message);
    throw err;
  }
};

module.exports = connectDb;