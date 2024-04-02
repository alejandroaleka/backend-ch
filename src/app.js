import express from "express";
import ProductManager from "./productManager.js";

const manager = new ProductManager();
const app = express();
const port = 8080;

app.get('/products', (req,res) => {
    const { limit } = req.query;

    return res.json({ productos: manager.getProducts(Number(limit)) })
})

app.get('/products/:pid', (req, res) => {
    const { pid } = req.params;

    return res.json({ producto: manager.getProductById(Number(pid)) });
})

app.listen(port, () => {
    console.log(`Aplicación ejecutadose en el puerto ${port}`)
})