const Product = require("../../models/Products");

const ProductControllers = () => ({
    saveProduct: async (req, res) => {
        const newProduct = new Product({...req.body});

        await newProduct.save((err, product) => {
            if(err) return res.status(500).send("Ha ocurrido un error al guardar el proyecto");

            if(!product) return res.status(404).send("Los datos del proyecto no son válidos");

            if(product) return res.status(200).send(product);
        })
    },
    getProducts: async (req, res) => {
        await Product.find((err, product) => {
            if(err) return res.status(500).send("Ha ocurrido un error al buscar los productos");

            if(!product) return res.status(404).send("No se encuentran productos");

            if(product) return res.status(200).send(product);
        })
    },
    getProduct: async (req, res) => {
        productID = req.params.id;

        await Product.findById(productID, (err, product) => {
            if(err) return res.status(500).send("Ha ocurrido un error al buscar el proyecto");

            if(!product) return res.status(404).send("Los datos del proyecto no son válidos");

            if(product) return res.status(200).send(product);
        })
    },
    updateProduct: async (req, res) => {
        productID = req.params.id;

        await Product.findByIdAndUpdate(productID, req.body, {new: true}, (err, product) => {
            if(err) return res.status(500).send("Ha ocurrido un error al modificar el proyecto");

            if(!product) return res.status(404).send("Los datos del proyecto no son válidos");

            if(product) return res.status(200).send(product);
        })
    },
    deleteProduct: async (req, res) => {
        productID = req.params.id;

        await Product.findOneAndRemove(productID, (err, product) => {
            if(err) return res.status(500).send("Ha ocurrido un error al eliminar el proyecto");

            if(!product) return res.status(404).send("Los datos del proyecto no son válidos");

            if(product) return res.status(200).send("Producto eliminado con éxito");
        })
    }
})

module.exports = ProductControllers;