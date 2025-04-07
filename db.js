const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define database path
const dbPath = path.resolve(__dirname, 'healthtracker.db');

// Create or open the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Could not connect to database', err);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      age INTEGER NOT NULL,
      weight REAL NOT NULL,
      height REAL NOT NULL,
      gender TEXT NOT NULL,
      password TEXT NOT NULL,
      contact TEXT,
      address TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS recommendations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      bmi REAL,
      category TEXT,
      daily_caloric_need INTEGER,
      diet TEXT,
      exercise TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
});

module.exports = db;


