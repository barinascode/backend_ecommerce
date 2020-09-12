const   bodyParser  =   require('body-parser'),
        cors        =   require('cors'),
        express = require('express')

const myServer = ({ app }) => {
   
    app.get('/', (req, res) => { res.send('Api wellcome message')})
    app.get('/status', (req, res) => { res.status(200).end()})
    app.head('/status', (req, res) => { res.status(200).end() })
    app.use(cors());
    app.use( express.json() )
    app.use(express.urlencoded({ extended: true }));
    // app.use(bodyParser.urlencoded({ extended: true }));

    return app
        
}

module.exports = myServer