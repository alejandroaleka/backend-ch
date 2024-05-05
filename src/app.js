import express from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars";

//import ProductManager from "./dao/productManager.js";
import products from "./routers/products.js";
import carts from "./routers/carts.js";
import views from "./routers/views.js"
import { dbConnection } from "./db/config.js";
import { productModel } from "./models/products.js";
import { messagesModel } from "./models/messages.js";

const app = express();
const port = 8080;

//const p = new ProductManager();


app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('./src/public'));


app.engine('handlebars', engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');


app.use('/', views);
app.use('/api/products', products);
app.use('/api/carts', carts);


await dbConnection();


const expressServer = app.listen(port, () => {
    console.log(`Aplicación ejecutadose en el puerto ${port}`);
});
const io = new Server(expressServer);

io.on('connection', async (socket)=>{
    // --> Products

    //const productos = p.getProducts();
    const products = await productModel.find();
    socket.emit('productos', products)

    socket.on('addProduct', async (product) => {
        //const result = p.addProduct({...product});

        const newProduct = await productModel.create({...product})
        if(newProduct){
            product.push(newProduct)
            socket.emit('productos', products)
        }
    });
    
    // --> Chat
    const messages = await messagesModel.find();
    socket.emit('message', messages);

    socket.on('message', async (data) => {
        const newMessage = await messagesModel.create({...data});
        if(newMessage) {
            const messages = await messagesModel.find();
            io.emit('chatLogs', messages)
        }
    });

    socket.broadcast.emit('new_user');

})
