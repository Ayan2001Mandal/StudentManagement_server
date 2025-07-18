const express = require('express');
const submitRouter = express.Router();

//middleware for file uplode
const upload = require('../middlewares/uplode');

// middleware for authentication
const authMiddleware = require('../middlewares/auth');

//import controllers
const createUpdateSubmission = require('../controllers/SubmissionControllers/createUpdateSubmission');

submitRouter.post('/submit',authMiddleware, upload.single('file'), createUpdateSubmission);




module.exports= submitRouter;