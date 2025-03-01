const dbSingleton = require("../dbSingleton");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    idNumber,
    phoneNumber,
    age,
    birthDate,
    password,
  } = req.body;

  // בדיקות תקינות
  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !idNumber ||
    !phoneNumber ||
    !age ||
    !birthDate ||
    !password
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (idNumber.length !== 9 || isNaN(idNumber)) {
    return res
      .status(400)
      .json({ error: "ID number must be exactly 9 digits" });
  }
  if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
    return res
      .status(400)
      .json({ error: "Phone number must be exactly 10 digits" });
  }

  const db = dbSingleton.getConnection();

  // בדיקה אם שם המשתמש או המייל כבר קיימים
  db.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0)
        return res
          .status(400)
          .json({ error: "Username or email already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      // שמירת המשתמש ב-DB
      db.query(
        "INSERT INTO users (first_name, last_name, username, email, id_number, phone_number, age, birth_date, password, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'user')",
        [
          firstName,
          lastName,
          username,
          email,
          idNumber,
          phoneNumber,
          age,
          birthDate,
          hashedPassword,
        ],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ message: "User registered successfully!" });
        }
      );
    }
  );
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  console.log(`🔍 Checking user: ${username}`);

  const db = dbSingleton.getConnection();
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        console.error("❌ Database error:", err);
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        console.log("⚠ User not found");
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const user = results[0];
      console.log("✅ User found:", user);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("❌ Password does not match");
        return res.status(400).json({ error: "Invalid credentials" });
      }

      console.log("✅ Login successful!");
      req.session.user = { username: user.username, role: user.role };
      req.session.save();
      res.json({ message: "Login successful", user: req.session.user });
    }
  );
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
};

const getCurrentUser = (req, res) => {
  res.json({ user: req.session.user });
};

module.exports = { registerUser, loginUser, logoutUser, getCurrentUser };
