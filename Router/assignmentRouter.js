const express = require('express');
const assignmentRouter = express.Router();
//middleware for file uplode
const upload = require('../middlewares/uplode');

// middleware for authentication
const authMiddleware = require('../middlewares/auth');
//controllers imports
const createAssignment  = require('../controllers/assignmentControllers/createAssignment');
const viewAssignment = require('../controllers/assignmentControllers/viewAssignment');
const deleteAssignment = require("../controllers/assignmentControllers/deleteAssignment")
const updateAssignment = require("../controllers/assignmentControllers/updateAssignment")

//Assignment Routers
assignmentRouter.post('/create', authMiddleware, upload.single('file'), createAssignment);
assignmentRouter.get('/',authMiddleware,viewAssignment);
assignmentRouter.delete('/:id',authMiddleware,deleteAssignment);
assignmentRouter.put('/:id', authMiddleware, upload.single('file'), updateAssignment);

module.exports = assignmentRouter;
