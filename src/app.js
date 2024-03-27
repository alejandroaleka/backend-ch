import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const port = 8080;

app.get('/products', (req,res) => {
    const {limit} = req.query;

    const manager = new ProductManager();
    const products = manager.getProducts();
    return res.json({productos:products})
})

app.get('/products/:pid', (req, res) => {
    const { pid } = req.params;
    const manager = new ProductManager();
    const product = manager.getProductById(Number(pid));
    return res.json({producto:product});
})

app.listen(port, () => {
    console.log(`Aplicación ejecutadose en el puerto ${port}`)
})