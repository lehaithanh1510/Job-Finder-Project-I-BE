const ApplicationModel = require('./application')
const mongoose = require('mongoose')

const createApplication = async({job,resume,owner,message,active=true}) => {

    const application = await ApplicationModel.create({job,resume,owner,message,active})

    return application

}

const getApplications = async({page,limit,userId}) => {

    const offset = (page-1)*limit

    const applications = await ApplicationModel.find({owner:userId}).skip(offset).limit(limit).sort({createdAt:-1}).populate("resume","link").populate("job","title")

    const total = await ApplicationModel.find({owner:userId}).countDocuments()

    return {applications,total}

}

const updateApplication = async({id,userId,updates}) => {

    const fields = Object.keys(updates)

    if(!isValidUpdate(fields, ['active'])){
 
        throw new Error('Update is invalid')
    
    } 

    if(updates.active) throw new Error('Update is invalid')

    const application = await ApplicationModel.findById(id).populate("job","owner")

    if(!application) throw new Error('Application is not found')

    if(!application.job.owner.equals(mongoose.Types.ObjectId(userId))) throw new Error('Update is not successful')

    application.active = false 

    application.save()

    return application

}

const isValidUpdate = (updates, allowedUpdate) => {

    return updates.every(update => allowedUpdate.includes(update))

}

module.exports = {createApplication, getApplications, updateApplication}