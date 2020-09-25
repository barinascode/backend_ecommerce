const isAdmin = require('../middlewares/isAdmin')
const verifyToken = require('../middlewares/verifyToken')
const checkDuplicateEmail = require('../middlewares/checkDuplicateEmail')

const routes = ({ app, handlersControllers }) => {

    const { TestController, AuthController, CartController, ProductsController, handlerPayment, RatingController, userControllers } = handlersControllers
    
    app.get( '/api/say-welcome', TestController.sayWelcome)

    app.post( '/api/paypal', verifyToken, handlerPayment.payment)

    app.get( '/api/say-bye', TestController.sayBye)
    
    app.post( '/api/login', AuthController.login)

    app.post( '/api/register', checkDuplicateEmail, AuthController.register)

    app.post( '/api/save-product', verifyToken, ProductsController.saveProduct)

    app.get( '/api/get-products', ProductsController.getProducts)

    app.get( '/api/get-product/:id', ProductsController.getProduct)

    app.put( '/api/update-product/:id', verifyToken, ProductsController.updateProduct)

    app.delete( '/api/delete-product/:id', verifyToken, ProductsController.deleteProduct)

    app.post( '/api/append-cart/:userID/:productID', CartController.appendProduct)

    app.get( '/api/get-cart/:id', verifyToken, CartController.getCart)

    app.delete( '/api/delete-cart/:id', verifyToken, CartController.deleteCart)

    app.delete( '/api/delete-one-cart/:userID/:productID', verifyToken, CartController.deleteOneCart)

    app.get( '/api/verify-one-cart/:userID/:productID', verifyToken, CartController.verifyOneCart)

    app.get( '/api/verify-cart/:id', verifyToken, CartController.verifyCart)

    app.post("/api/calificate/:productID/:userID", verifyToken, RatingController.calificate)

    app.get("/api/verify-calificate/:productID/:userID", verifyToken, RatingController.detectedCalificate)

    app.get('/api/users', [verifyToken, isAdmin], userControllers.getUsers)

}

module.exports = routes