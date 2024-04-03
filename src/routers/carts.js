import { Router } from "express";
import CartsManager from "../dao/cartsManager.js";

const router = Router();
const manager = new CartsManager();

router.get('/:cid', (req,res) => {
    const cid = parseInt(req.params.cid, 10);

    if(!cid){
        res.status(404).send({error: "Debe enviar un id para su búsqueda"})
    }
    res.status(200).json(manager.getCartsById(cid));
})

router.post('/', (req,res) => {
    let { products=[] } = req.body
    const result = manager.createCart(req.body)
    
    return res.json({result});
})

router.post('/:cid/product/:pid', (req,res) => {
    const {cid, pid} = parseInt(req.params, 10);
    const result = manager.addCart(cid, pid)

    if(!cid || !pid){
        res.status(404).send({error: "Debe enviar un id para su búsqueda"})
    }
    res.status(200).json({result});
})

export default router;