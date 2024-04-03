import { Router } from "express";
import ProductManager from "../dao/productManager.js";

const router = Router();
const manager = new ProductManager();

router.get('/', (req,res) => {
    const limit = parseInt(req.params.limit, 10);

    if(isNaN(limit)) {
        return res.status(400).json({error: `solo se aceptan números`})
    }
    return res.json({ productos: manager.getProducts(Number(limit)) })
})

router.get('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid, 10);
    

    if(isNaN(pid)) {
        return res.status(400).json({error: `solo se aceptan números en el query param`})
    }
    return res.json({ producto: manager.getProductById(Number(pid)) });
})

router.post('/', (req, res) => {
    let { title, description, code, price, status=true, stock, category, thumbnails=[] } = req.body
    
    const result = manager.addProduct(req.body)
    try {
        if (result.code !== (req.body.code)) {
            res.status(400).json({error: result.replace(/\r?\n|\r/g, "")})
        }
        res.status(200).json({result})
    } catch (error) {
        return res.status(500).json({ 
            error: `Error inesperado`, 
            detalle: `${error.message}` 
        })
    }
})

router.put('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid, 10);
    let { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const result = manager.updateProduct(pid, req.body)

    if(isNaN(pid)) {
        return res.status(400).json({error: `solo se aceptan números en el query param`})
    }
    try {
        return res.status(200).json({result})
    } catch (error) {
        return res.status(500).json({
            error: `Error inensperado`,
            detalle: `${error.message}`
        })
    }
})

router.delete('/:pid', (req, res) => {
    const pid = parseInt(req.params.pid, 10);
    const result = manager.deleteProduct(pid)

    if(isNaN(pid)) {
        return res.status(400).json({error: `solo se aceptan números en el query param`})
    }
    try {
        return res.status(200).json({result})
    } catch (error) {
        return res.status(500).json({
            error: `Error inensperado`,
            detalle: `${error.message}`
        })
    }
})

export default router;