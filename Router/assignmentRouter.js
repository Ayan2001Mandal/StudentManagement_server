const express = require('express');
const assignmentRouter = express.Router();
const upload = require('../middlewares/uplode');
const createAssignment  = require('../controllers/assignmentControllers/createAssignment');
const authMiddleware = require('../middlewares/auth');

assignmentRouter.post('/create', authMiddleware, upload.single('file'), createAssignment);

module.exports = assignmentRouter;
