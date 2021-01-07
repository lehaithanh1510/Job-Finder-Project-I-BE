const ResumeRouter = require('express').Router()
const ResumeController = require('./resume.controller')
const EmployeeAuth = require('../middlewares/employee.auth')

//Create resume 
ResumeRouter.post('/', EmployeeAuth, async(req,res) => {

    try {
       
        const {title, link} = req.body 

        const userId = req.user._id

        const newResume = await ResumeController.createResume({title, link, userId})

        res.status(201).send({success:1, data:newResume})

    } catch (e) {
        
        res.status(500).send({success:0, message: e.message})

    }

})

//Get all resume
ResumeRouter.get('/', EmployeeAuth, async(req,res) => {

    try {
        
        const {page,limit} = req.query 

        const pageNumber = page ? Number(page) : 1

        const limitNumber = limit ? Number(limit) : 8

        const userId = req.user._id

        const result = await ResumeController.getResumes({page:pageNumber,limit:limitNumber,userId})

        res.status(200).send({success:1, data:result})

    } catch (e) {
        
        res.status(400).send({success:0, message: e.message})

    }

}) 

//Get a resume 
ResumeRouter.get('/:id', EmployeeAuth, async(req,res) => {

    try {

        const {id} = req.params

        const userId = req.user._id 

        const resume = await ResumeController.getAResume({id,userId})

        res.status(200).send({success:0, data: resume})
        
    } catch (e) {
        
        res.status(400).send({success:0, message: e.message})

    }

})


//Update a resume
ResumeRouter.patch('/:id', EmployeeAuth, async(req,res) => {

    try {

        const {id} = req.params

        const userId = req.user._id 

        const updates = req.body

        const resume = await ResumeController.updateResume({id,userId,updates})

        res.status(200).send({success:0, data: resume})

    } catch (e) {
        
        res.status(500).send({success:0, message: e.message})

    }

})

//Delete resume
ResumeRouter.delete('/:id', EmployeeAuth, async(req,res) => {

    try {
        
        const {id} = req.params

        const userId = req.user._id 

        const resume = await ResumeController.deleteResume({id,userId})

        res.status(200).send({success:0, data: resume})

    } catch (e) {
        
        res.status(500).send({success:0, message: e.message})

    }

})

module.exports = ResumeRouter