const express = require("express");
const userRouter = express.Router();
const authMiddleware = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');

const getAllStudents = require('../controllers/usersControllers/getAllStudent');
const getAllTeachers = require("../controllers/usersControllers/getAllTeacher");
const updateUser = require("../controllers/usersControllers/updateUser");
const DeleteUser = require("../controllers/usersControllers/deleteUser");
const getDeactivatedStudents = require("../controllers/usersControllers/getAlldeactivateStudent");
const getDeactivatedTeachers = require("../controllers/usersControllers/getAlldeactivateTeacher");
const updateCurrentUser = require("../controllers/usersControllers/updateCurrentUser");
const getCurrentUser = require("../controllers/usersControllers/getCurrentUser");



userRouter.get('/me',authMiddleware,getCurrentUser);
userRouter.get('/students',authMiddleware,getAllStudents);
userRouter.get('/teachers',authMiddleware,adminOnly,getAllTeachers);
userRouter.put('/update/my', authMiddleware, updateCurrentUser);
userRouter.put('/update/:id', authMiddleware, updateUser);
userRouter.delete('/delete/:id',authMiddleware,DeleteUser);
userRouter.get('/students/deactivated',authMiddleware,getDeactivatedStudents);
userRouter.get('/teachres/deactivated',authMiddleware,adminOnly,getDeactivatedTeachers);

module.exports = userRouter;
