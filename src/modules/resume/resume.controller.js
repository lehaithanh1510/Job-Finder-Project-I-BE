const ResumeModel = require('./resume')

const createResume = async ({title, link, userId}) => {

    const resume = await ResumeModel.create({title, link, owner:userId})

    return resume 

}

const getResumes = async ({userId, page, limit}) => {

    const offset = (page-1)*limit

    const resume = await ResumeModel.find({owner:userId}).skip(offset).limit(limit).sort({createdAt:-1})

    const total = await ResumeModel.find({owner:userId}).countDocuments()

    return {resume,total}

}

const getAResume = async({id,userId}) => {

    const resume = await ResumeModel.findOne({_id:id, owner:userId})

    if(!resume) throw new Error('Resume is not found')

    return resume 

}

const updateResume = async({id,userId,updates}) => {

    const fields = Object.keys(updates)

    if(!isValidUpdate(fields, ['title','link'])){
 
        throw new Error('Update is invalid')
    
    } 

    const resume = await ResumeModel.findOne({_id:id, owner:userId})

    if(!resume) throw new Error('Resume is not found')

    fields.forEach(field => resume[field] = updates[field])

    await resume.save()

    return resume 

}

const deleteResume = async({id,userId}) => {

    const resume = await ResumeModel.findOneAndDelete({_id:id,owner:userId})

    if(!resume) throw new Error('Cannot delete post')

    return resume

}

const isValidUpdate = (updates, allowedUpdate) => {

    return updates.every(update => allowedUpdate.includes(update))

}

module.exports = {createResume, getResumes, getAResume, updateResume, deleteResume}