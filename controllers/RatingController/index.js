const Product = require("../../models/Products");

const ratingController = () => ({

    calificate: async (req, res) => {
        productID = req.params.id;
        
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
       
        await Product.findByIdAndUpdate(productID, product, {new: true}, (err, product) => {
            if(err) return res.status(500).send("Error al agregar la puntuación");

            if(!product) return res.status(404).send("Los datos del producto no son válidos");

            if(product) return res.status(200).send(product)
        })
    }
})

module.exports = ratingController;