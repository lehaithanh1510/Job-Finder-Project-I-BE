const mongoose = require('mongoose')

const ApplicationSchema = new mongoose.Schema({
    owner: {
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    },
    job: {
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    resume: {
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'Resume'
    },
    message: {
        type:String
    },
    active:{
        requried:true,
        type:Boolean
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Application', ApplicationSchema)