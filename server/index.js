const express = require('express');
const cors = require('cors');
const app = express();

const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());

//Start the server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`)
})