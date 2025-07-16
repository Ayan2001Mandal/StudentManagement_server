const express = require("express");
const authRouter = express.Router();

const register = require("../controllers/AuthControllers/register");
const login = require("../controllers/AuthControllers/login");

authRouter.post("/register", register); 
authRouter.post('/login',login);

module.exports = authRouter;
