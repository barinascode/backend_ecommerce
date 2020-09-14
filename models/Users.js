const mongoose      =   require('mongoose');
const { Schema }    =   mongoose;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String , required: true },
    phone: { type: String , required: true },
    cart: {type: [Schema.ObjectId], ref: "Product", default: null}
},
{
    versionKey: false,
});

module.exports = mongoose.model( 'User', userSchema );