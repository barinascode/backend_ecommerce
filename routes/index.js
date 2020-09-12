const routes = ({ app, handlersControllers }) => {

    const { TestController, AuthController } = handlersControllers
    
    app.get( '/api/say-welcome', TestController.sayWelcome)

    app.get( '/api/say-bye', TestController.sayBye)
    
    app.post( '/api/login', AuthController.login)

    app.post( '/api/register', AuthController.register)

}

module.exports = routes