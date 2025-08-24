import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./middleware/auth.js";

dotenv.config();
const app = express();

app.use(express.json());

// ✅ Auth APIs
app.use("/api/auth", authRoutes);
app.use("/api/users", authRoutes);


// ✅ Example Protected API
app.get("/api/profile", verifyToken, (req, res) => {
  res.json({ message: "Profile data", user: req.user });
});

// ✅ Port fixed to 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
