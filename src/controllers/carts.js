import { request, response } from "express";
import { cartModel } from "../models/carts.js";

export const getCartById = async (req = request, res = response) => {
    try {
        const cid = parseInt(req.params.cid, 10);

        if(!cid){
            res.status(404).send({error: "Debe enviar un id para su búsqueda"})
        }
        const cart = await cartModel.findById(cid);
        return res.status(200).json({ cart })
    } catch (error) {
        console.log(`getCartById fallo con error: `, error)
        return res.status(500).json({msg:'Error: Contactar al administrador'})
    }
}

export const createCart = async (req = request, res = response) => {
    try {
        let { products=[] } = req.body
        const newCart = await cartModel.create(req.body)
        res.status(200).json({ newCart })
    } catch (error) {
        console.log(`createCart fallo con error: `, error)
        return res.status(500).json({msg:'Error: Contactar al administrador'})
    }
}

export const addProductToCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = parseInt(req.params, 10);
        const cart = await cartModel.findById(cid);

        if(!cid){
            return res.status(400).json({ msg: `No existe carrito con id ${cid}`})
        }

        const productInCart = cart.products.find(p=>p.id.toString() === pid);
    
        if(productInCart){
            productInCart.quantity++;
        } else {
            cart.products.push({ id: pid, quantity: 1 })
        }

        cart.save();

        res.status(200).json({ msg: 'Carrito actualizado correctamente', cart });
    } catch (error) {
        console.log(`addProductToCart fallo con error: `, error)
        return res.status(500).json({msg:'Error: Contactar al administrador'})
    }
}