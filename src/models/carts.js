import {Schema, model} from 'mongoose'

const nameCollection = 'Cart'

const CartSchema = new Schema({
    products:[
        {
            id:{
            type:Schema.Types.ObjectId,
            ref: 'Product'
            },
            quantity:{
                type:Number,
                required: [true, 'Quantity es obligatorio']
            }
        }
    ]
});

export const cartModel = model(nameCollection, ProductSchema)