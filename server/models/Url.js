const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const dbFilePath = path.join(__dirname, "../mock-db.json");

// Helper to read/write JSON file database
function readMockDB() {
  if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify([]));
  }
  try {
    return JSON.parse(fs.readFileSync(dbFilePath, "utf8"));
  } catch (e) {
    return [];
  }
}

function writeMockDB(data) {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}

// Check if we are in mock mode
const useMock = () => {
  return global.isMockDB || !process.env.MONGO_URI;
};

// Mongoose model implementation as fallback
let RealUrlModel;
try {
  const UrlSchema = new mongoose.Schema({
    urlCode: { type: String, required: true, unique: true },
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    clicks: { type: Number, required: true, default: 0 },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: "90d" },
    },
  });
  RealUrlModel = mongoose.model("Url", UrlSchema);
} catch (e) {
  // Mongoose model might fail to compile or throw if connection is not ready
}

// A mock model that acts like mongoose model
class MockUrlModel {
  constructor(data) {
    this.urlCode = data.urlCode;
    this.longUrl = data.longUrl;
    this.shortUrl = data.shortUrl;
    this.clicks = data.clicks || 0;
    this.createdAt = data.createdAt || new Date();
  }

  async save() {
    const db = readMockDB();
    const index = db.findIndex(item => item.urlCode === this.urlCode);
    if (index >= 0) {
      db[index] = {
        urlCode: this.urlCode,
        longUrl: this.longUrl,
        shortUrl: this.shortUrl,
        clicks: this.clicks,
        createdAt: this.createdAt
      };
    } else {
      db.push({
        urlCode: this.urlCode,
        longUrl: this.longUrl,
        shortUrl: this.shortUrl,
        clicks: this.clicks,
        createdAt: this.createdAt
      });
    }
    writeMockDB(db);
    return this;
  }

  static async findOne(query) {
    const db = readMockDB();
    const key = Object.keys(query)[0];
    const val = query[key];
    const found = db.find(item => item[key] === val);
    if (found) {
      return new MockUrlModel(found);
    }
    return null;
  }
}

module.exports = new Proxy(function() {}, {
  construct(target, args) {
    if (useMock()) {
      return new MockUrlModel(args[0]);
    } else {
      return new RealUrlModel(...args);
    }
  },
  get(target, prop) {
    if (useMock()) {
      if (prop === "findOne") {
        return MockUrlModel.findOne;
      }
      return MockUrlModel[prop];
    } else {
      return RealUrlModel[prop];
    }
  }
});

