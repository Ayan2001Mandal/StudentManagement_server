const express = require('express');
const assignmentRouter = express.Router();
const upload = require('../middlewares/uplode');
const createAssignment  = require('../controllers/assignmentControllers/createAssignment');
const viewAssignment = require('../controllers/assignmentControllers/viewAssignment');
const deleteAssignment = require("../controllers/assignmentControllers/deleteAssignment")



const authMiddleware = require('../middlewares/auth');

assignmentRouter.post('/create', authMiddleware, upload.single('file'), createAssignment);
assignmentRouter.get('/',authMiddleware,viewAssignment);
assignmentRouter.delete('/:id',authMiddleware,deleteAssignment);

module.exports = assignmentRouter;
