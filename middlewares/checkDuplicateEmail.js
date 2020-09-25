const User = require('../models/Users')

const checkDuplicateEmail = async (req, res, next) => {
    try {
        const email = await User.find({email: req.body.email})
        
        if(email){
            return res.status(400).json('the email already exists')
        }
        next()
    } catch (error) {
        console.error(error)
    }
}

module.exports = checkDuplicateEmail