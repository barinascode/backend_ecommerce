const routes = ({ app, handlersControllers }) => {

    const { TestController } = handlersControllers
    
    app.get( '/api/say-welcome', TestController.sayWelcome)
    app.get( '/api/say-bye', TestController.sayBye)

}

module.exports = routes