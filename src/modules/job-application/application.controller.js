const ApplicationModel = require('./application')
const mongoose = require('mongoose')
const SendMail = require('../utils/sendEmail')
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const createApplication = async({job,resume,owner,message,active='pending'}) => {

    const application = await ApplicationModel.create({job,resume,owner,message,active})

    return application

}
 
const getApplications = async({page,limit,userId}) => {

    const offset = (page-1)*limit

    const applications = await ApplicationModel.find({owner:userId}).skip(offset).limit(limit).sort({createdAt:-1}).populate({path:"resume", select:"title link"}).populate("job","title")

    const total = await ApplicationModel.find({owner:userId}).countDocuments()

    return {applications,total}
    

} 

const updateApplication = async({id,userId,updates}) => {

    const fields = Object.keys(updates)

    if(!isValidUpdate(fields, ['active'])){
 
        throw new Error('Update is invalid')
    
    } 

    const application = await ApplicationModel.findById(id).populate("job","owner title").populate("owner", "email")

    if(!application) throw new Error('Application is not found')

    if(!application.job.owner.equals(mongoose.Types.ObjectId(userId))) throw new Error('Update is not successful')
    
    application.active = updates.active

    application.deepPopulate('job.owner', function(err, app){
        
        const employee = app.owner.email 
        
        const job = app.job.title

        const company = app.job.owner.name 

        if(app.active === 'rejected') {
            
            SendMail.sendRejectEmail({employee, job, company})
        
        }

        else if(app.active === 'shortlisted') {
        
            SendMail.sendShortlistEmail({employee, job, company})
        }
    })

    application.save()

    return application
}

const isValidUpdate = (updates, allowedUpdate) => {

    return updates.every(update => allowedUpdate.includes(update))

}

module.exports = {createApplication, getApplications, updateApplication}