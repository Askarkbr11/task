const {Schema,model} = require("mongoose")

const CounterModel = new Schema({
    id:{
        type:String
    },
    seq:{
        type:Number
    }
})

module.exports= model("counter",CounterModel)
