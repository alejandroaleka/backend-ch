import express from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars";

import ProductManager from "./dao/productManager.js";
import products from "./routers/products.js";
import carts from "./routers/carts.js";
import views from "./routers/views.js"
import { dbConnection } from "./db/config.js";

const app = express();
const port = 8080;

const p = new ProductManager();


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
const socketServer = new Server(expressServer);

socketServer.on('connection', socket=>{

    const productos = p.getProducts();
    socket.emit('productos', productos)

    socket.on('addProduct', product => {
        const result = p.addProduct({...product});
    })
    
})
