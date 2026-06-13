const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

console.log("Mongo URI Loaded:", MONGO_URI ? "YES" : "NO");

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err.message));

// =====================
// Schemas
// =====================

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
const Admin = mongoose.model("Admin", adminSchema);

// =====================
// Auth Middleware
// =====================

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
}

// =====================
// Contact Form API
// =====================

app.post("/api/messages", async (req, res) => {
  try {
    console.log("Received Form Data:", req.body);

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Please enter a valid email address.",
      });
    }

    const savedMessage = await Message.create({
      name,
      email,
      message,
    });

    console.log("Saved Successfully:", savedMessage);

    res.status(201).json({
      success: true,
      message: "Form Submitted Successfully",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Message Save Error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// =====================
// Admin Register
// =====================

app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        error: "Invalid admin credentials.",
      });
    }

    const token = jwt.sign(
      { email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Login failed.",
    });
  }
});

// =====================
// Admin Login
// =====================

app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        error: "Invalid credentials.",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid credentials.",
      });
    }

    const token = jwt.sign(
      {
        email: admin.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Login failed.",
    });
  }
});

// =====================
// Get Messages
// =====================

app.get("/api/messages", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find().sort({
      createdAt: -1,
    });

    res.json(messages);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Could not fetch messages.",
    });
  }
});

// =====================
// Delete Message
// =====================

app.delete("/api/messages/:id", authMiddleware, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Message deleted.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Delete failed.",
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});