const express = require("express");
const router = express.Router();

const authRoutes = require("./Router/authRouter"); // 

router.use("/auth", authRoutes); 


module.exports = router;
