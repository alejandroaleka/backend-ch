const file = "src/products.json";
const ProductManager = require("./productManager");

const manager = new ProductManager(file);

console.clear();

const productos = await manager.getProducts();
console.log(productos);

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

const data3 = {
    "title": "NVIDIA 4070 Super",
    "description": "NVIDIA",
    "price": 1200,
    "thumbnail": "N/A",
    "code": "AABB2",
    "stock": 10
  }


const result = await manager.addProduct(data);
console.log(result);

const result2 = await manager.addProduct(data2);
console.log(result2);

const result3 = await manager.getProducts()
console.log(result3);

const result4 = await manager.getProductById(1);
console.log(result4);

const result5 = await manager.addProduct(data);
console.log(result5);

const result6 = await manager.getProductById(3);
console.log(result6);

const result7 = await manager.updateProduct(1, data3);
console.log(result7);