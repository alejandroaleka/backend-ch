import {Schema, model} from 'mongoose'

const nameCollection = 'Cart'

const CartSchema = new Schema({
    products:[
        {
            _id: false,
            id:{
            type:Schema.Types.ObjectId,
            ref: 'Products'
            },
            quantity:{
                type:Number,
                required: [true, 'Quantity es obligatorio']
            }
        }
    ]
});

export const cartModel = model(nameCollection, CartSchema)