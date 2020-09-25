const { Schema, model } = require('mongoose')

const roleSchema = new Schema({
    name: String
},{ versionkey: false })

module.exports = model('role', roleSchema)