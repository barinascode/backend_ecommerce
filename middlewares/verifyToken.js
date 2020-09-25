const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const jwtkey = "myjwtpassword123";

const verifyToken = async (req, res, next) => {
    let token = req.headers['x-access-token']

    if(!token) return res.status(403).json('No token provided')

    try {
        const decoded = jwt.verify(token, jwtkey)
        req.userId = decoded.id

        const userFound = await User.findById(req.userId, { password: 0 })
        if(!userFound) return res.status(404).json('no user found')
        
        console.log(userFound)

        next()
    } catch (error) {
        return res.status(401).json('unauthorized')       
    }
}

module.exports = verifyToken