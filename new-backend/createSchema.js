const db = require("./src/models/db");

const createSchema = () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  db.query(createUsersTable, (err, results) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("Users table created successfully:", results);
    }
  });
};

createSchema();
