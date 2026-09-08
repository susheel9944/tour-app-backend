const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("Secret exists:", !!process.env.RAZORPAY_KEY_SECRET);
app.use(cors());
app.use(express.json());

const paymentRoutes = require("./routes/payment");

app.use("/api/payment", paymentRoutes);
app.post("/test", (req, res) => {
  console.log("TEST API HIT");

  res.json({
    success: true,
    message: "API is working",
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
