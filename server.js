const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./db");

dotenv.config(); // ✅ Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public")); // ✅ Serve static files (HTML, CSS, JS)

// ✅ Import Routes
const authRoutes = require("./Routes/authroutes");  // ✅ Ensure this is lowercase
const recommendationRoutes = require("./Routes/recommendationRoutes");

// ✅ Use API Routes
app.use("/auth", authRoutes);
app.use("/recommendations", recommendationRoutes);

// ✅ Connect to Database & Start Server
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection error:", err);
  } else {
    console.log("✅ Database connected");
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  }
});



  