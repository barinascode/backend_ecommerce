const Role = require('../models/role')
const User = require('../models/Users')
const { removeListener } = require('../models/role')

const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount()

        if(count > 0) return

        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'admin'}).save()
        ])

    } catch (error) {

        console.error(error)
        
    }
}

const createAdmin = async () => {
    const userFound = await User.findOne({email: 'admin@localhost.com'})
    const rolesFound = await Role.findOne({ name: 'admin' })

    if(!userFound){
        await User.create({
            firstName: 'admin',
            email: 'admin@localhost.com',
            password: '123',
            roles: [rolesFound._id]
        })
        console.log('admin user created')
    }
}

module.exports = {
    createRoles,
    createAdmin
}