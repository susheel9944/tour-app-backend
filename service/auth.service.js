const User = require("../models/User");

const { hashPassword, comparePassword } = require("../utils/Password");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

// Register User

const registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

// Login User

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Token Payload

  const payload = {
    userId: user._id,
    email: user.email,
  };

  // Generate Access Token

  const accessToken = generateAccessToken(payload);

  // Generate Refresh Token

  const refreshToken = generateRefreshToken(payload);

  // Save Refresh Token

  user.refreshToken = refreshToken;

  await user.save();

  return {
    accessToken,

    refreshToken,

    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

// Generate New Access Token

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  // Verify Refresh Token

  const decoded = verifyRefreshToken(refreshToken);

  // Find User

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Check Token

  if (user.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  // Generate New Access Token

  const newAccessToken = generateAccessToken({
    userId: user._id,
    email: user.email,
  });

  return {
    accessToken: newAccessToken,
  };
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
};
