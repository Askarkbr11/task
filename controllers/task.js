const TaskModel = require("../model/task");
const CounterModel = require("../model/counter")

exports.createTask = async(req,res)=>{
    const {task,date,status} = req.body;
    try {
        if(status!="completed"&&status!="incomplete") return res.status(500).json({message:"invalid status"})
        CounterModel.findOneAndUpdate(
            {id:"autoval"},
            {"$inc":{"seq":1}},
            {new:true},async(err,cd)=>{
                let taskId;
                if(cd==null){
                    const newVal = new CounterModel({id:"autoval",seq:1})
                    newVal.save()
                    taskId = 1;
                }else{
                    taskId = cd.seq;
                }
                const payload = {task,date,status,taskId}
                await TaskModel.create(payload)
                return res.status(201).json({message:"task successfully created",payload})
            }
        )        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

exports.deleteTask = async (req,res)=>{
    try {
        await TaskModel.findOneAndDelete({taskId:req.params.taskId})
        return res.status(201).json({message:"task successfully deleted"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

exports.updateTask = async (req,res)=>{
    try {
        await TaskModel.findOneAndUpdate({taskId:req.params.taskId},req.body,{new:true})
        return res.status(201).json({message:"task successfully updated"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}