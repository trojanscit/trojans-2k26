require("dotenv").config(); // Load environment variables
const express = require("express");
const connectDB = require("./config/dbConfig");
const userRoutes = require("./routes/userRoutes");
const registeredRoutes = require("./routes/registerRoutes");
const cors = require("cors");
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/registered", registeredRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
