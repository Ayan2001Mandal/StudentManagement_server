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



userRouter.get('/students',authMiddleware,adminOnly,getAllStudents);
userRouter.get('/teachers',authMiddleware,adminOnly,getAllTeachers);
userRouter.put('/update/:id', authMiddleware, updateUser);
userRouter.delete('/delete/:id',authMiddleware,DeleteUser);
userRouter.get('/students/deactivated',authMiddleware,adminOnly,getDeactivatedStudents);
userRouter.get('/teachres/deactivated',authMiddleware,adminOnly,getDeactivatedTeachers);

module.exports = userRouter;
