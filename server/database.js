const mongoose = require('mongoose');
const URI = 'mongodb+srv//Edgar018:microserviciosisop@cluster0.uqyln.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URI)
    .then(db => console.log('db is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;