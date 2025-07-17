const express = require("express");
const router = express.Router();

const authRoutes = require("./Router/authRouter"); // 
const assignmentRouter = require("./Router/assignmentRouter");

router.use("/auth", authRoutes); 
router.use('/assignment',assignmentRouter);


module.exports = router;
