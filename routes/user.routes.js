const express = require("express");

const { getProfile } = require("../controller/user.controller");

const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/profile", authenticate, getProfile);

module.exports = router;
