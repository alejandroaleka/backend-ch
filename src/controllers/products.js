import { request, response } from "express";
import { productModel } from '../models/products.js';

export const getProducts = async (req = request, res = response) => {
    try {
        const { limit } = parseInt(req.params.limit, 10);
        if(isNaN(limit)) {
            return res.status(400).json({error: `solo se aceptan números`})
        }

        const [products, total] = await Promise.all([
            productModel.find(),
            productModel.countDocuments()
        ]);
        
        return res.status(200).json({ total, products })
    } catch (error) {
        console.log(`getProducts fallo con error: `, error)
        return res.status(500).json({msg:'Error: Contactar al administrador'})
    }
}

export const getProductById = async (req = request, res = response) => {
    try {
        const pid = parseInt(req.params.pid, 10);
        if(isNaN(pid)) {
            return res.status(400).json({error: `solo se aceptan números en el query param`})
        }
        const product = await productModel.findById(pid);
        return res.status(200).json({ product })
    } catch (error) {
        console.log(`getProductById fallo con error: `, error)
        return res.status(500).json({msg:'Error: Contactar al administrador'})
    }
}

export const addProduct = async (req = request, res = response) => {
    try {
        let { title, description, code, price, status=true, stock, category, thumbnails=[] } = req.body
        if (result.code !== (req.body.code)) {
            res.status(400).json({error: result.replace(/\r?\n|\r/g, "")})
        }
        const product = await productModel.create(req.body)
        res.status(200).json( product )
    } catch (error) {
        console.log(`addProduct fallo con error: `, error)
        return res.status(500).json({msg:'Error: Contactar al administrador'})
    }
}
    
export const updateProduct = async (req = request, res = response) => {
    try {
        const pid = parseInt(req.params.pid, 10);
        let { title, description, code, price, status, stock, category, thumbnails } = req.body;
        if(isNaN(pid)) {
            return res.status(400).json({error: `solo se aceptan números en el query param`})
        }
        const product = await productModel.findByIdAndUpdate(pid);
        return res.status(200).json({msg:'Produto actualizado', product});
    } catch (error) {
        console.log(`updateProduct fallo con error: `, error)
        return res.status(500).json({msg:'Error: Contactar al administrador'})
    }
}

export const deleteProduct = async (req = request, res = response) => {
    try {
        const pid = parseInt(req.params.pid, 10);
        if(isNaN(pid)) {
            return res.status(400).json({error: `solo se aceptan números en el query param`})
        }
        const product = await productModel.findByIdAndDelete(pid);
        return res.status(200).json({ msg: 'Producto eliminado', product });
    } catch (error) {
        console.log(`updateProduct fallo con error: `, error)
        return res.status(500).json({msg:'Error: Contactar al administrador'})
    }
}
