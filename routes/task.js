const express = require("express");
const router = express.Router();
const {createTask, deleteTask, updateTask} = require("../controllers/task");
const {Protected} =require("../middlewares/protected")

router.post("/task",Protected,createTask).delete("/task/:id",Protected,deleteTask).patch("/task/:id",Protected,updateTask)

module.exports = router;