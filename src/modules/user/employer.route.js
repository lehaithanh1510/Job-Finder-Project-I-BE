const EmployerRouter = require('express').Router()
const EmployerController = require('./employer.controller')
const EmployerAuth = require('../middlewares/employer.auth')

EmployerRouter.post('/signup', async(req, res) => {

    try {
        const {email, password, confirmPassword} = req.body

        if(password !== confirmPassword){

            throw new Error('Confirm password does not match')

        }

        const employer = await EmployerController.createUser({email, password})

        res.status(201).send({success:1, data: employer})

    } catch (e) {

        res.status(400).send({success:0, error: e.message})

    }
})

EmployerRouter.post('/signin', async(req, res) => {

    try {
        const {email, password} = req.body

        const employer = await EmployerController.signIn({email,password})

        res.status(200).send({success:1, data: employer})
        
    } catch (e) {
        
        res.status(401).send({success:0, message: e.message})

    }
})

EmployerRouter.get('/verify', EmployerAuth, (req,res) => {

    try {

        res.status(200).send({success:1})
        
    } catch (e) {
        
        res.status(401).send({success:0})

    }

})

EmployerRouter.get('/', EmployerAuth, async(req,res) => {

    try {

        const id = req.user._id
    
        const profile = await EmployerController.getProfile(id)

        res.status(200).send({success:1, data:profile})

    } catch (e) {
        
        res.status(400).send({success:0, message:e.message})

    }

})

EmployerRouter.get('/:id', async(req,res) => {

    try {

        const {id} = req.params

        const profile = await EmployerController.getProfile(id)

        res.status(200).send({success:1, data:profile})
        
    } catch (e) {
        
        res.status(500).send({success:0, message:e.message})

    }

})

EmployerRouter.patch('/', EmployerAuth, async(req,res) => {

    try {

        const id = req.user._id 

        const updates = req.body 

        const profile = await EmployerController.updateProfile({id,updates})

        res.status(200).send({success:1, data:profile})

    } catch (e) {
        
        res.status(400).send({success:0, message:e.message})

    }

})

EmployerRouter.delete('/', EmployerAuth, async(req,res) => {

    try {

        const id = req.user._id 

        const user = await EmployerController.deleteProfile(id)

        res.status(200).send({success:1, data:user})

        
    } catch (e) {
        
        res.status(400).send({success:0, message:e.message})
    }

})

module.exports = EmployerRouter 