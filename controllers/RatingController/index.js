const Product = require("../../models/Products");
const Users = require("../../models/Users");

const ratingController = () => ({

    calificate: async (req, res) => {
        productID = req.params.productID;
        userID = req.params.userID;

        const product = await Product.findById(productID);
        product.calificates.push(req.body.rating);

        var suma = 0;
        product.calificates.forEach((element, i) => {
            suma += element;
        })

        product.rating = (suma / product.calificates.length).toFixed(1);
        const decimal = (product.rating % 1).toFixed(1);
        const ratingRound = Math.round(product.rating);

        if(product.rating % 1 != 0){
            if(decimal == 0.2 || decimal == 0.3 || decimal == 0.8 || decimal == 0.9) product.rating = ratingRound;

            if(decimal == 0.7 || decimal == 0.6) product.rating = ratingRound - 0.5;
            
            if(decimal == 0.3 || decimal == 0.4) product.rating = ratingRound + 0.5;
        }
       
        await Product.findByIdAndUpdate(productID, product, {new: true}, async (err, product) => {
            if(err) return res.status(500).send("Error al agregar la puntuación");

            if(!product) return res.status(404).send("Los datos del producto no son válidos");

            if(product){
                const user = await Users.findById(userID);

                if(user){
                    
                    user.productsRating.push({productID: product._id, rating: product.rating});

                    await Users.findByIdAndUpdate(userID, user, {new: true}, (err, user) => {
                        if(err) return res.status(500).send("Error al guardar puntuación");

                        if(!user) return res.status(404).send("Los datos del usuario no son válidos");

                        if(user) return res.status(200).send({user, product});
                    })
                }
            }
        })
    },
    detectedCalificate: async (req, res) => {
        const userID = req.params.userID;
        const productID = req.params.productID;

        await Users.findById(userID, (err, user) => {
            if(err) return res.status(500).send("Error al buscar usuario");

            if(!user) return res.status(404).send("Los datos del usuario no son válidos");

            if(user){
                
                try{
                    user.productsRating.forEach(element => {
                        if(element.productID == productID){
                            return res.status(200).send({rating: element.rating});
                        }
                    })
                } catch(err){
                    return res.status(200).send({rating: false});
                }
            }
        })
    }
})

module.exports = ratingController;