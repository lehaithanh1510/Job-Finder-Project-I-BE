const PostRouter = require('express').Router()
const PostController = require('./post.controller')
const EmployerAuth = require('../middlewares/employer.auth')

// Create job post
PostRouter.post('/', EmployerAuth, async(req,res) => {

    try {
        
        const {title, description, keywords, salary} = req.body

        const userId = req.user._id

        const newPost = await PostController.createPost({title, description, userId, keywords, salary})

        res.status(201).send({success:1, data:newPost})

    } catch (e) {
        
        res.status(400).send({success:0, message: e.message})

    }

})

// Get a post
PostRouter.get('/:id', async(req,res) => {

    try {
        
        const {id} = req.params
    
        const post = await PostController.getAPost(id)
    
        res.status(200).send({success:1, data:post})

    } catch (e) {
        
        res.status(400).send({success:0, message:e.message})
    
    }
})

//Get detailed post
PostRouter.get('/private/:id', EmployerAuth, async(req,res) => {

    try {

        const {id} = req.params

        const userId = req.user._id
    
        const post = await PostController.getDetailPost(id, userId)
    
        res.status(200).send({success:1, data:post})
        
    } catch (e) {
        
        res.status(500).send({success:0, message:e.message})

    }
})

// Get multiple posts 
// /api/post?page=1&limit=8&key=java+sql&company
PostRouter.get('/', async(req,res) => {

    try {

        const {page, limit, key, max, min, company} = req.query

        const keyword = key ? key.split(' ') : undefined

        const pageNumber = page ? Number(page) : 1

        const limitNumber = limit ? Number(limit) : 8

        const maxSalary = max ? Number(max) : undefined

        const minSalary = min ? Number(min) : undefined

        const companyId = company ? company : undefined

        const result = await PostController.getPosts({page:pageNumber, limit:limitNumber, keyword, maxSalary, minSalary,companyId})

        res.status(200).send({success:1, data:result})
        
    } catch (e) {
        
        res.status(400).send({success:0, message:e.message})

    }
})

//Modify a post 
PostRouter.patch('/:id', EmployerAuth, async(req,res) => {

    try {
        
        const {id} = req.params

        const userId = req.user._id

        const updates = req.body

        const result = await PostController.updatePost(id, userId, updates)

        res.status(200).send({success:1, data:result})

    } catch (e) {
        
        res.status(500).send({success:0, message:e.message})

    }
})

//Delete a post
PostRouter.delete('/:id', EmployerAuth, async(req,res) => {

    try {

        const {id} = req.params

        const userId = req.user._id

        const result = await PostController.deletePost(id,userId)
        
        res.status(200).send({success:1, data:result})

    } catch (e) {
        
        res.status(500).send({success:0, message:e.message})

    }
})

module.exports = PostRouter

