const   AuthController = require('./AuthController'),
        TestController = require('./TestController'),
        CartController = require('./CartController'),
        ProductsController = require('./ProductsController'),
        handlerPayment = require('./PaypalPayment'),
        RatingController = require("./RatingController"),
        userControllers = require('./UserControllers')

module.exports = {
        TestController,
        AuthController,
        CartController,
        ProductsController,
        handlerPayment,
        RatingController,
        userControllers
}
