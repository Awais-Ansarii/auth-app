// authRoutes;
const express = require("express");
const router = express.Router();
const { signup, login, google,  logout } = require("../controllers/auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google);
router.get("/logout", logout);
module.exports = router;
