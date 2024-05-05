import { Router } from "express";
import { addProductToCart, createCart, getCartById } from "../controllers/carts.js";
//import CartsManager from "../dao/cartsManager.js";

const router = Router();
//const manager = new CartsManager();

router.get('/:cid', getCartById)

router.post('/', createCart)

router.post('/:cid/product/:pid', addProductToCart)

export default router;