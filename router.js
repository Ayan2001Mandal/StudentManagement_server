const express = require("express");
const router = express.Router();

// import routers 
const authRoutes = require("./Router/authRouter"); // 
const assignmentRouter = require("./Router/assignmentRouter");
const submitRouter = require("./Router/submitRouter");
const userRouter = require("./Router/userRouters");


router.use("/auth", authRoutes); 
router.use('/assignment',assignmentRouter);
router.use('/submission',submitRouter)
router.use('/user',userRouter)


module.exports = router;
