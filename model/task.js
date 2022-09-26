const {Schema,model} = require("mongoose")

const TaskModel = new Schema({
    task:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["incomplete","completed"],
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    taskId:{
        type:Number,
        required:true
    }   
},{
    timestamps:true
})

module.exports= model("tasks",TaskModel)
