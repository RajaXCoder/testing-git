const mysql = require("mysql2");
require("colors");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connectDB = async () => {
  try {
    const connection = await db.promise().getConnection();
    console.log("Connected to MySQL".magenta.underline);
    connection.release();
  } catch (err) {
    console.error("MySQL connection error:", err);
    setTimeout(connectDB, 2000);
  }
};

module.exports = { connectDB, db };
