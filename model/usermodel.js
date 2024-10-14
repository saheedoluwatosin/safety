const mongoose = require("mongoose")




const user = mongoose.Schema({
    name: {type:String , required:true},
    employee_id : {type:String , required:true},
    password:{type:String , required:true},
    role: { type: String, enum: ['creator', 'taker'], default: 'taker' },
    totalScore:{type:Number , default:0}
},
{
    timestamps:true
})


const User = mongoose.model("user",user)









module.exports = User
