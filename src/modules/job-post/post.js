const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        required:true,
        type:String,
        trim:true
    },
    active:{
        required:true,
        type:Boolean
    },
    owner:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employer'
    },
    description:{
        required:true,
        type:String
    },
    keywords:{
        type:[String]
    },
    salary:{
        required:true,
        type:Number
    }
    
},{
    timestamps:true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

PostSchema.virtual('applications',{
    ref: 'Application',
    localField: '_id',
    foreignField: 'job',
})

module.exports = mongoose.model('Post', PostSchema)