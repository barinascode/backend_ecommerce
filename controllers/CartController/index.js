const User = require("../../models/Users");
const Product = require("../../models/Products");

const Cart = () => ({

    appendProduct: async (req, res) => {
        userID = req.params.userID;
        productID = req.params.productID;

        const user = await User.findById(userID);

        const product = await Product.findById(productID);

        if(product && user){
            user.cart.push(productID);
            await User.findByIdAndUpdate(userID, user, (err, user) => {
                if(err) return res.status(500).send("Ha ocurrido un error al agregar el producto al carrito");

                if(!user) return res.status(404).send("No se encuentra el usuario");

                if(user) return res.status(200).send(user);
            }) 
        } else {
            return res.status(500).send("No se encuentra el producto ni el usuario");
        }
    }
})

module.exports = Cart;