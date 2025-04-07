const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// ✅ Import Routes
const authRoutes = require("./Routes/authroutes");
const recommendationRoutes = require("./Routes/recommendationRoutes");

// ✅ Use API Routes
app.use("/auth", authRoutes);
app.use("/recommendations", recommendationRoutes);

// ✅ Start server directly (SQLite doesn't require .connect())
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
