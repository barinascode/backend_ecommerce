const User = require('../../models/Users')

const UserControllers = () => ({
    getUsers: async (req, res) => {
        const usersFound = await User.find()
        res.status(200).json(usersFound)
    }
})

module.exports = UserControllers