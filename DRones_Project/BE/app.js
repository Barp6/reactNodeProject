const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dbSingleton = require("./dbSingleton");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const droneRoutes = require("./routes/droneRoutes"); // 👈 הוספנו את הנתיבים של הרחפנים

const app = express();
const port = 5000;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);

// התחברות למסד נתונים (בודק חיבור)
const db = dbSingleton.getConnection();
db.query("SELECT 1", (err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database!");
  }
});

// הגדרת הנתיבים
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/drones", droneRoutes); // 👈 הוספנו את הנתיב של הרחפנים

// בדיקה שהשרת רץ
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

// הפעלת השרת
app.listen(port, "localhost", () => {
  console.log(`🚀 Server running on port ${port}`);
});
