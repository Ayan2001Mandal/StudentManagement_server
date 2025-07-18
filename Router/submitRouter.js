const express = require('express');
const submitRouter = express.Router();

const upload = require('../middlewares/uplode');
const authMiddleware = require('../middlewares/auth');

// Submissions Controllers
const createUpdateSubmission = require('../controllers/SubmissionControllers/createUpdateSubmission');
const getMySubmissions = require('../controllers/SubmissionControllers/getmySubmission');
const getSubmissionsByAssignment = require('../controllers/SubmissionControllers/getSubmissionsByAssignment');

// Grade Controllers
const gradeSubmission = require('../controllers/SubmissionControllers/gradeSubmission');
const getGradesByAssignment = require('../controllers/SubmissionControllers/getGradesByAssignment');
const getMyGradeForAssignment = require('../controllers/SubmissionControllers/getMyGradeForAssignment');

// Grading routes
submitRouter.put('/:submissionId/grade', authMiddleware, gradeSubmission);
submitRouter.get('/grades/assignment/:assignmentId', authMiddleware, getGradesByAssignment);
submitRouter.get('/my-grade/:assignmentId', authMiddleware, getMyGradeForAssignment);

// Submission routes
submitRouter.post('/submit', authMiddleware, upload.single('file'), createUpdateSubmission);
submitRouter.get('/my', authMiddleware, getMySubmissions);
submitRouter.get('/:id', authMiddleware, getSubmissionsByAssignment);



module.exports = submitRouter;
