const mongoose = require('mongoose')

const ResumeSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String,
    },
    owner:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    },
    link: {
        required:true,
        type:String 
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Resume', ResumeSchema)