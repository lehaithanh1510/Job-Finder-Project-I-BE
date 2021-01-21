const EmployerModel = require('./employer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SendMail = require('../utils/sendEmail')

const genToken = (userId) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES})

    return token

}

const signIn = async({email, password}) => {

    const user = await EmployerModel.findOne({email}).lean()

    if(!user) throw new Error('Email is not recognised')

    const {password: inputPassword, ...restData} = user

    const pwdIsMatch = bcrypt.compareSync(password, inputPassword)

    if(!pwdIsMatch) throw new Error('Password is not correct')

    const token = genToken(restData._id)

    return {user:restData, token}

}

const createUser = async ({email, password}) => {

    const salt = bcrypt.genSaltSync(8)

    const hashPassword = bcrypt.hashSync(password, salt)
    
    const user = await EmployerModel.create({email, password: hashPassword})

    SendMail.sendWelcomeEmail(user.email)

    const token = genToken(user._id)

    return {user,token}

}

const getProfile = async(id) => {

    const profile = await EmployerModel.findById(id)

    delete profile._doc.password 

    delete profile._doc.createdAt

    delete profile._doc.updatedAt

    return profile 

}

const updateProfile = async({id,updates}) => {

    const fields = Object.keys(updates)

    if(!isValidUpdate(fields, ['name','image','description','location','logo'])){
 
        throw new Error('Update is invalid')
    
    } 

    const user = await EmployerModel.findById(id)

    if(!user) throw new Error('Profile is not found')

    fields.forEach(field => user[field] = updates[field])

    await user.save()

    return user 

}

const deleteProfile = async(id) => {

    const user = await EmployerModel.findByIdAndDelete(id)

    if(!user) throw new Error('User is not found')

    return user

}

const isValidUpdate = (updates, allowedUpdate) => {

    return updates.every(update => allowedUpdate.includes(update))

}


module.exports = {createUser, signIn, getProfile, updateProfile, deleteProfile}