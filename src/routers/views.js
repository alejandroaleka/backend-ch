import { Router } from "express";
import { productModel } from '../models/products.js';
//import ProductManager from "../dao/productManager.js";

const router = Router();

//const p = new ProductManager();
//const productos = p.getProducts();


router.get('/', async (req,res)=>{
    const products = await productModel.find().lean();
    return res.render('home',{products});
})

router.get('/realtimeproducts', async (req,res)=>{
    return res.render('realTimeProducts');
})

router.get('/chat', async (req,res)=>{
    return res.render('chat');
})

export default router;