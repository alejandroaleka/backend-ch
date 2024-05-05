import {Schema, model} from 'mongoose'

const nameCollection = 'Products'

const ProductSchema = new Schema({
    title:{type:String, required:[true,'Title es obligatorio']},
    description:{type:String, required:[true,'Description es obligatorio']},
    code:{type:String, required:[true,'Code es obligatorio']},
    price:{type:Number, required:[true,'Price es obligatorio']},
    status:{type:Boolean, default: true},
    stock:{type:Number, required:[true,'Stock es obligatorio']},
    category:{type:String, required:[true,'Caategory es obligatorio']},
    thumbnails:[{type:String}],
});

ProductSchema.set('toJSON', {
    transform: function(doc,ret){
        delete ret.__v;
        return ret;
    }
})

export const productModel = model(nameCollection, ProductSchema)