// authRoutes;
const express = require("express");
const router = express.Router();
const { signup, login, google, signout } = require("../controllers/auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google);
// router.get("/signout", signout);
module.exports = router;
