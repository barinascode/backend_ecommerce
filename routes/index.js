const ProductControllers = require("../controllers/ProductsController")

const routes = ({ app, handlersControllers }) => {

    const { TestController, AuthController, CartController, ProductsController, handlerPayment } = handlersControllers
    
    app.get( '/api/say-welcome', TestController.sayWelcome)

    app.post( '/api/paypal', handlerPayment.payment)

    app.get( '/api/say-bye', TestController.sayBye)
    
    app.post( '/api/login', AuthController.login)

    app.post( '/api/register', AuthController.register)

    app.post( '/api/save-product', ProductsController.saveProduct)

    app.get( '/api/get-products', ProductsController.getProducts)

    app.get( '/api/get-product/:id', ProductsController.getProduct)

    app.put( '/api/update-product/:id', ProductsController.updateProduct)

    app.delete( '/api/delete-product/:id', ProductsController.deleteProduct)

    app.post( '/api/append-cart/:userID/:productID', CartController.appendProduct)

    app.get( '/api/get-cart/:id', CartController.getCart)

    app.delete( '/api/delete-cart/:id', CartController.deleteCart)

    app.delete( '/api/delete-one-cart/:userID/:productID', CartController.deleteOneCart)

    app.get( '/api/verify-one-cart/:userID/:productID', CartController.verifyOneCart)

    app.get( '/api/verify-cart/:id', CartController.verifyCart)

}

module.exports = routes