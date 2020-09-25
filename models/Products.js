const mongoose      =   require('mongoose');
const { Schema }    =   mongoose;

const productSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true},
    rating: { type: Number, default: 0, min: 0, max: 5},
    calificates: { type: [Number], default: []}
},
{
    versionKey: false,
});

module.exports = mongoose.model('Product', productSchema);
