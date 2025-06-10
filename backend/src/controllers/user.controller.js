const { db } = require("../config/db");

const createUser = async (req, res) => {
  const { username, password, email } = req.body;
  const query =
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";

  try {
    const [result] = await db
      .promise()
      .execute(query, [username, password, email]);
    res.status(201).json({ message: "User created", userId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.sqlMessage || "Database error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const [results] = await db.promise().execute("SELECT * FROM users");
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const [results] = await db
      .promise()
      .execute("SELECT * FROM users WHERE id = ?", [req.params.id]);
    res.status(200).json(results[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
};

const updateUser = async (req, res) => {
  const { username, email } = req.body;
  try {
    await db
      .promise()
      .execute("UPDATE users SET username = ?, email = ? WHERE id = ?", [
        username,
        email,
        req.params.id,
      ]);
    res.status(200).json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await db
      .promise()
      .execute("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
