import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://aleka:iTC22TPpUbdkqfqn@ecommerce.e1rbbju.mongodb.net/ecommerce');
        console.log('Base de datos iniciada')
    } catch (error) {
        console.log(`Error la iniciar la base de datos ${error}`)
    }
}