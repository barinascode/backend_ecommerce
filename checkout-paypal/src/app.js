const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.set('PORT', process.env.PORT || 3000);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(require('./route/paypal.route.js'));

module.exports = app;