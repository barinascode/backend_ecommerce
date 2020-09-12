const mongoose      =   require('mongoose');
const { Schema }    =   mongoose;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String , required: true },
    phone: { type: String , required: true }
});

module.exports = mongoose.model( 'User', userSchema );
