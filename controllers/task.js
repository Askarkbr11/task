const TaskModel = require("../model/task");

exports.createTask = async(req,res)=>{
    const {task,date,status} = req.body;
    try {
        const payload = {task,date,status}
        await TaskModel.create(payload)
        return res.status(201).json({message:"task successfully created",payload})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

exports.deleteTask = async (req,res)=>{
    try {
        await TaskModel.findByIdAndDelete({_id:req.params.id})
        return res.status(201).json({message:"task successfully deleted"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

exports.updateTask = async (req,res)=>{
    try {
        await TaskModel.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
        return res.status(201).json({message:"task successfully updated"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}