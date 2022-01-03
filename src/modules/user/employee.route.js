const EmployeeRouter = require('express').Router()
const EmployeeController = require('./employee.controller')
const EmployeeAuth = require('../middlewares/employee.auth')

EmployeeRouter.post('/signup', async(req, res) => {
    try {
        const {email, password, confirmPassword} = req.body

        if(password !== confirmPassword){

            throw new Error('Confirm password does not match')

        }
        const employee = await EmployeeController.createUser({email, password})
        res.status(201).send({success:1, data: employee})
    } catch (e) {
        res.status(400).send({success:0, error: e.message})

    }
})

EmployeeRouter.post('/signin', async(req, res) => {
    try {
        const {email, password} = req.body

        const employee = await EmployeeController.signIn({email,password})

        res.status(200).send({success:1, data: employee})
        
    } catch (e) {
        
        res.status(401).send({success:0, message: e.message})

    }
})

EmployeeRouter.get('/verify', EmployeeAuth, (req,res) => {
    try {

        res.status(200).send({success:1, data:req.user})
        
    } catch (e) {
        
        res.status(401).send({success:0, message:e.message})

    }

})

EmployeeRouter.get('/', EmployeeAuth, async(req,res) => {
    try {

        const id = req.user._id
    
        const profile = await EmployeeController.getProfile(id)

        res.status(200).send({success:1, data:profile})

    } catch (e) {
        
        res.status(400).send({success:0, message:e.message})

    }

})

EmployeeRouter.get('/:id', async(req,res) => {

    try {

        const {id} = req.params

        const profile = await EmployeeController.getProfile(id)

        res.status(200).send({success:1, data:profile})
        
    } catch (e) {
        
        res.status(500).send({success:0, message:e.message})

    }

})

EmployeeRouter.patch('/', EmployeeAuth, async(req,res) => {

    try {

        const id = req.user._id 

        const updates = req.body 

        const profile = await EmployeeController.updateProfile({id,updates})

        res.status(200).send({success:1, data:profile})

    } catch (e) {
        
        res.status(400).send({success:0, message:e.message})

    }

})

EmployeeRouter.delete('/', EmployeeAuth, async(req,res) => {
    try {
        const id = req.user._id 

        const user = await EmployeeController.deleteProfile(id)

        res.status(200).send({success:1, data:user})
    } catch (e) {
        
        res.status(400).send({success:0, message:e.message})
    }

})

module.exports = EmployeeRouter