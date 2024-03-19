const file = "src/products.json";
const ProductManager = require("./productManager");

const producto = new ProductManager(file);

console.clear();

console.log(producto.getProducts());

const data = {
    title: "producto prueba",
    description: "Este es un producto de prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
}

const data2 = {
    title: "otro prod",
    description: "Este es un producto de prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abcasdfas123",
    stock: 25
}

console.log(producto.addProduct(data));
console.log(producto.addProduct(data2));


console.log(producto.getProducts());

console.log(producto.getProductById(1));

console.log(producto.addProduct(data));

console.log(producto.getProductById(3));