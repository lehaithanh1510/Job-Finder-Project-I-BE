const path = require('path')
const cors = require('cors')
require('dotenv').config({path:path.join(__dirname, '../config/dev.env')})
const express = require('express')
require('./modules/db/mongoose')
require('./modules/utils/checkExpire')

const app = express()
app.use(cors())
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

const server = require('http').createServer(app)
const options = {
    cors: {
        origin: "*"
    }
}

const io = require('socket.io')(server,options)
io.on('connection', socket => {
    console.log(`${socket.id} connected`)

})

server.listen(port, () => {

    console.log(`server is up on port ${port}`)

})