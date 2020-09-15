const   AuthController = require('./AuthController'),
        TestController = require('./TestController'),
        CartController = require('./CartController'),
        ProductsController = require('./ProductsController'),
        handlerPayment = require('./PaypalPayment')

module.exports = {
        TestController,
        AuthController,
        CartController,
        ProductsController,
        handlerPayment
}
