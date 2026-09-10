const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);

    process.exit(1);
  }
};

module.exports = connectDatabase;

// susheel2me_db_user

// MMrhDi4IcI9lCL4I
