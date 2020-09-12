/*
* Server dependecies
*/
const   express   = require('express'),
        mongoose  = require('mongoose'),
        jwt       = require('jsonwebtoken'),
        loaders   = require('./loaders'),
        server    = require('./server'),
        routes    = require('./routes'),
        app       = express()
/*
* Running server
*/
server({ app , routes , mongoose, loaders, jwt })