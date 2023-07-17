const express = require("express");
const { dashboard, login } = require("../controllers/main");
const authMiddleWare = require("../middleware/auth");
const router = express.Router();

router.route("/dashboard").get(authMiddleWare, dashboard);
router.route("/login").post(login);

module.exports = router;
