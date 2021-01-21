const mongoose = require('mongoose')

const EmployerSchema = new mongoose.Schema({
    email:{
        unique:true,
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String,
        trim:true
    },
    name:{ 
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:[String]
    },
    location:{
        type:[String]
    },
    logo:{
        type:String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Employer', EmployerSchema)