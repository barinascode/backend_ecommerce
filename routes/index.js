const routes = ({ app, handlersControllers }) => {

    const { TestController } = handlersControllers
    
    app.get( '/api/welcome', isAuth, isAuth, RequestSayWelcome, TestController.sayWelcome)

}

module.exports = routes