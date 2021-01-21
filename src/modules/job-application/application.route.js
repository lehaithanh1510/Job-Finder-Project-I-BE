const ApplicationRouter = require('express').Router()
const ApplicationController = require('./application.controller')
const EmployeeAuth = require('../middlewares/employee.auth')
const EmployerAuth = require('../middlewares/employer.auth')

//Create an application
ApplicationRouter.post('/', EmployeeAuth, async(req,res) => {

    try {

        const {job, resume, message} = req.body

        const owner = req.user._id 

        const application = await ApplicationController.createApplication({job,resume,owner,message})

        res.status(201).send({success:1, data: application})

         
    } catch (e) {
        
        res.status(400).send({success:0, message: e.message})

    }

})

//GET all applications 
ApplicationRouter.get('/', EmployeeAuth, async(req,res) => {
    
    try {
        
        const {page,limit} = req.params
    
        const pageNumber = page ? Number(page) : 1
    
        const limitNumber = limit ? Number(limit) : 8

        const userId = req.user._id
    
        const result = await ApplicationController.getApplications({page:pageNumber,limit:limitNumber,userId})
    
        res.status(200).send({success:1, data:result})
    
    } catch (e) {
        
        res.status(500).send({success:0, message: e.message})

    }
})


//Update an application
ApplicationRouter.patch('/:id', EmployerAuth, async(req,res) => {

    try {
 
        const {id} = req.params

        const userId = req.user._id

        const updates = req.body

        const application = await ApplicationController.updateApplication({id,userId,updates})

        res.status(200).send({success:1, data:application})
        
    } catch (e) {
        
        res.status(500).send({success:0, message:e.message})

    }
})


module.exports = ApplicationRouter