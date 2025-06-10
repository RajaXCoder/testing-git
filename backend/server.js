require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./src/routes");
app.use("/api/users", userRoutes);

// Start server and connect DB
const { connectDB } = require("./src/config/db");
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
});
