const User = require('../models/Users')
const Role = require('../models/role')


const isAdmin = async (req, res, next) => {
    try {

        const userFound = await User.findOne({_id: req.userId})
        const roles = await Role.find({ _id: { $in: userFound.roles } })
        

        for(let i = 0; i<roles.length; i++){
            if(roles[i].name  === 'admin'){
                next()
                return
            }
        }

        return res.status(400).json('Require admin role')
    } catch (error) {
        console.error(error)
    }
}

module.exports = isAdmin