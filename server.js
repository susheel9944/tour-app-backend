const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const connectDatabase = require("./database/database");

dotenv.config();

const app = express();
console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("Secret exists:", !!process.env.RAZORPAY_KEY_SECRET);
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

const paymentRoutes = require("./routes/payment");
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Node.js API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/payment", paymentRoutes);
app.post("/test", (req, res) => {
  console.log("TEST API HIT");

  res.json({
    success: true,
    message: "API is working",
  });
});
const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(process.env.PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Server error:", error.message);

    process.exit(1);
  }
};
startServer();
