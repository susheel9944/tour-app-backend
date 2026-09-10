const { verifyAccessToken } = require("../utils/jwt");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    // Verify Access Token

    const decoded = verifyAccessToken(token);

    // Add User to Request

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Access token expired or invalid",
    });
  }
};

module.exports = {
  authenticate,
};
