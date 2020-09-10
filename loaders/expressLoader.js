
const   bodyParser  =   require('body-parser')
        cors        =   require('cors')


const myServer = ({ app }) => {
   
    app.get('/', (req, res) => { res.send('Api wellcome message')})
    app.get('/status', (req, res) => { res.status(200).end()})
    app.head('/status', (req, res) => { res.status(200).end() })
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));

    return app
        
}

module.exports = myServer