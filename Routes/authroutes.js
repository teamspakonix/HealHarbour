const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

// ✅ Signup API (Registers a New User)
router.post("/signup", async (req, res) => {
    const { name, email, age, weight, height, gender, contact, address, password } = req.body;

    console.log("📩 Signup Request Received:", req.body);

    const checkEmailSql = "SELECT id FROM users WHERE email = ?";
    db.get(checkEmailSql, [email], async (err, existingUser) => {
        if (err) {
            console.error("❌ Database error while checking email:", err);
            return res.status(500).json({ error: "Database error!" });
        }

        if (existingUser) {
            console.log("❌ Email already exists");
            return res.status(400).json({ error: "Email already registered!" });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const insertSql = `
                INSERT INTO users (name, email, age, weight, height, gender, contact, address, password)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            db.run(insertSql, [name, email, age, weight, height, gender, contact, address, hashedPassword], function (err) {
                if (err) {
                    console.error("❌ Error inserting user:", err);
                    return res.status(500).json({ error: "Signup failed!" });
                }

                console.log("✅ User registered with ID:", this.lastID);
                res.status(201).json({ message: "User registered successfully" });
            });
        } catch (error) {
            console.error("❌ Error hashing password:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
});

// ✅ Login API (Validates User Login)
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    console.log("📩 Login Request Received:", email);

    const sql = "SELECT * FROM users WHERE email = ?";

    db.get(sql, [email], async (err, user) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Database error!" });
        }

        if (!user) {
            console.log("❌ User not found:", email);
            return res.status(401).json({ error: "Invalid email or password!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("❌ Invalid password for:", email);
            return res.status(400).json({ error: "Invalid email or password!" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("✅ User logged in:", user.email);
        res.json({ token, user });
    });
});

// ✅ Fetch User Data (Requires User ID)
router.get("/user/:id", (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT name, email, age, weight, height, gender, contact, address FROM users WHERE id = ?";

    db.get(sql, [userId], (err, user) => {
        if (err) return res.status(500).json({ error: "Error fetching user data" });
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    });
});

module.exports = router;




