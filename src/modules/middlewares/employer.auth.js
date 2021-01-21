const jwt = require('jsonwebtoken')
const EmployerModel = require('../user/employer')

const EmployerAuth = async (req,res,next) => {

    const token = req.headers.authorization 

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const {userId} = decoded

        const user = await EmployerModel.findById(userId)

        if(!user) throw new Error('User is not recognised')

        req.user = user 

        next()

    } catch (e) {
        
        return res.status(400).send({success:0, message: e.message})

    }

}

module.exports = EmployerAuth