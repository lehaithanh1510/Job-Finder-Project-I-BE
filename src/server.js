const path = require('path')
require('dotenv').config({path:path.join(__dirname, '../config/dev.env')})
const express = require('express')
require('./modules/db/mongoose')

const app = express()
const port = process.env.PORT

const EmployeeRouter = require('./modules/user/employee.route')
const EmployerRouter = require('./modules/user/employer.route')
const PostRouter = require('./modules/job-post/post.route')
const ResumeRouter = require('./modules/resume/resume.route')
const ApplicationRouter = require('./modules/job-application/application.route')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/api/employee', EmployeeRouter)
app.use('/api/employer', EmployerRouter)
app.use('/api/post', PostRouter)
app.use('/api/resume', ResumeRouter)
app.use('/api/application', ApplicationRouter)

app.listen(port, () => {

    console.log(`server is up on port ${port}`)

})