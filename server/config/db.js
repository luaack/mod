const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri || mongoUri.includes("your_mongodb_atlas_uri")) {
    console.warn("⚠️  No valid MONGO_URI found in environment variables.");
    console.warn("⚠️  MakeLink will run using a persistent local JSON database (mock-db.json) instead.");
    global.isMockDB = true;
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB Connected Successfully");
    global.isMockDB = false;
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    console.warn("⚠️  Falling back to a persistent local JSON database (mock-db.json).");
    global.isMockDB = true;
  }
};

module.exports = connectDB;

