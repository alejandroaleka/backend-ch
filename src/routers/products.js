import { Router } from "express";
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/products.js";
//import ProductManager from "../dao/productManager.js";

const router = Router();
//const manager = new ProductManager();

router.get('/', getProducts)

router.get('/:pid', getProductById)

router.post('/', addProduct)

router.put('/:pid', updateProduct)

router.delete('/:pid', deleteProduct)

export default router;