import {Schema, model} from 'mongoose'

const nameCollection = 'Messages'

const MessagesSchema = new Schema({
    user:{type:String, required:[true, 'User es obligatorio']},
    message:{type:String, required:[true, 'Message es obligatorio']}
});

export const messagesModel = model(nameCollection, ProductSchema)