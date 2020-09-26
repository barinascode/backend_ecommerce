const mongoose      =   require('mongoose');
const { Schema }    =   mongoose;
const bcrypt        =   require("bcryptjs");

const userSchema = new Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String , required: true },
    phone: { type: String , required: true },
    cart: {type: [Schema.ObjectId], ref: "Product", default: null},
    productsRating: {type: [], default: []},
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'role'
    }]
},
{
    versionKey: false,
});

userSchema.methods.encryptPassword = async (password) => {
    return await bcrypt.hash(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = async (password, realPassword) => {
    return await bcrypt.compareSync(password, realPassword);
}

module.exports = mongoose.model( 'User', userSchema );