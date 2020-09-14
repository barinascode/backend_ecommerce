const ProductControllers = require("../controllers/ProductsController")

const routes = ({ app, handlersControllers }) => {

    const { TestController, AuthController, CartController, ProductsController } = handlersControllers
    
    app.get( '/api/say-welcome', TestController.sayWelcome)

    app.get( '/api/say-bye', TestController.sayBye)
    
    app.post( '/api/login', AuthController.login)

    app.post( '/api/register', AuthController.register)

    app.post( '/api/append-cart/:userID/:productID', CartController.appendProduct)

    app.post( '/api/save-post', ProductsController.saveProduct)

    app.get( '/api/get-products', ProductsController.getProducts)

    app.get( '/api/get-product/:id', ProductsController.getProduct)

    app.put( '/api/update-product/:id', ProductsController.updateProduct)

    app.delete( '/api/delete-product/:id', ProductsController.deleteProduct)

}

module.exports = routes