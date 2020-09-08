const app = require('./app');

app.listen(app.get('PORT'), () => {
    console.log('server on port', app.get('PORT'));
});