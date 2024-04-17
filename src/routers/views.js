import { Router } from "express";
import ProductManager from "../dao/productManager.js";

const router = Router();
const p = new ProductManager();
const productos = p.getProducts();

router.get('/', (req,res)=>{
    return res.render('home',{productos});
})

router.get('/realtimeproducts', (req,res)=>{
    return res.render('realTimeProducts',{productos});
})

export default router;