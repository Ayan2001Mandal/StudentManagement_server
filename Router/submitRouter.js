const express = require('express');
const submitRouter = express.Router();

//middleware for file uplode
const upload = require('../middlewares/uplode');

// middleware for authentication
const authMiddleware = require('../middlewares/auth');

//import controllers
const createUpdateSubmission = require('../controllers/SubmissionControllers/createUpdateSubmission');
const getMySubmissions = require('../controllers/SubmissionControllers/getmySubmission');
const getSubmissionsByAssignment = require('../controllers/SubmissionControllers/getSubmissionsByAssignment');



submitRouter.post('/submit',authMiddleware, upload.single('file'), createUpdateSubmission);
submitRouter.get('/my',authMiddleware, getMySubmissions);
submitRouter.get('/:id',authMiddleware, getSubmissionsByAssignment);




module.exports= submitRouter;