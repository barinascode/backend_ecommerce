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
            await User.findByIdAndUpdate(userID, user, {new: true},(err, user) => {
                if(err) return res.status(500).send("Ha ocurrido un error al agregar el producto al carrito");

                if(!user) return res.status(404).send("No se encuentra el usuario");

                if(user) return res.status(200).send(user);
            }) 
        } else {
            return res.status(500).send("No se encuentra el producto ni el usuario");
        }
    },
    getCart: async (req, res) =>{
        userID = req.params.id;

        await User.findById(userID, (err, user) => {
            if(err) return res.status(500).send("Ha ocurrido un error al buscar el usuario");

            if(!user) return res.status(404).send("No se encuentra el usuario");

            if(user){
                Product.populate(user, {path: "cart"}, (err, user) => {
                    if(err) return res.status(500).send("Ha ocurrido un error al buscar los productos del carrito");

                    if(!user) return res.status(404).send("No se encuentran los productos");

                    if(user) return res.status(200).send(user.cart);
                })
            }
        })
    },
    deleteCart: async (req, res) => {
        userID = req.params.id;

        const user = await User.findById(userID);
        user.cart = []

        try{
            await User.findByIdAndUpdate(userID, user, {new: true}, (err, user) => {
                if(err) return res.status(500).send("Ha ocurrido un error al eliminar los productos del carrito");
    
                if(!user) return res.status(404).send("No se encuentra el usuario");
    
                if(user) return res.status(200).send(user);
            })
        }catch (error){
            console.log(error);
        }
    },
    deleteOneCart: async (req, res) => {
        userID = req.params.userID;
        productID = req.params.productID;

        const user = await User.findById(userID);
        const indice = user.cart.indexOf(productID);
        user.cart.splice(indice, 1);

        try{
            await User.findByIdAndUpdate(userID, user, {new: true}, (err, user) => {
                if(err) return res.status(500).send("Ha ocurrido un error al eliminar el producto del carrito");
    
                if(!user) return res.status(404).send("No se encuentra el usuario");
    
                if(user) return res.status(200).send(user);
            })
        }catch(error){
            console.log(error);
        }
    },
    verifyCart: async (req, res) =>{
        const userID = req.params.id;

        await User.findById(userID, (err, user) => {
            if(err) return res.status(500).send("Ha ocurrido un error al buscar el usuario");

            if(!user) return res.status(404).send("No se encuentra el usuario");

            if(user.cart.length > 0){
                return res.status(200).send({cart: true});
            } else {
                return res.status(404).send({cart: false});
            }
        })
    },
    verifyOneCart: async (req, res) => {
        userID = req.params.userID;
        productID = req.params.productID;

        const user = await User.findById(userID);

        const product = await Product.findById(productID);

        if(user && product){
            user.cart.forEach((element, i) => {

                console.log(element);
                if(element == productID){
                    return res.status(200).send({product: true});
                }

                return res.status(404).send("Este producto no esta agregado en tu carrito");

            });
        }
    }
})

module.exports = Cart;