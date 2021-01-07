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
    image:{
        type:[String]
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Employer', EmployerSchema)