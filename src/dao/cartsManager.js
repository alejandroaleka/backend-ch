import fs from 'fs'
import ProductManager from './productManager.js';

class CartsManager {
  #carts;
  #path;
    constructor() {
      this.#path = './src/data/carts.json';
      this.#carts = this.#readCartsFromFile();
    }

    #readCartsFromFile(){
      try {
        if(fs.existsSync(this.#path)) {
          return JSON.parse(fs.readFileSync(this.#path, "utf-8"));
        }
        return [];
      } catch (error) {
        console.log(`Ocurrió un error al obtener los productos: ${error}`);
      }
    }

    #saveCartsToFile(){
      try {
        fs.writeFileSync(this.#path, JSON.stringify(this.#carts));
      } catch (error) {
        console.log(`Ocurrió un error al guardar los productos: ${error}`);
      }
    }

    createCart(data) {
      /* if (!Array.isArray(data.products)) {
          return `El campos [products] son obligatorios debe ser enviado como array.`;
      } */
      const newCart = {
        id: (this.#carts).length + 1,
        products: []
      }
      this.#carts.push(newCart);

      this.#saveCartsToFile();

      return newCart;
    };
    
    getCartsById(id) {
      if(!this.#carts) {
          throw new Error("El archivo JSON está vacío.");
      }
      const json = this.#carts;
      const cart = json.find(c => c.id === id);
      if (!cart) {
          throw new Error(`No se encontraron productos con el ID ${id}. \n`);
      }
      return cart;
    }

    addCart(cid, pid){
      const index = this.#carts.findIndex(c => c.id === cid)

      if(index === -1){
        throw new Error(`El carrito con ID ${id} no existe.`);
      }
      const indexInCart = this.#carts[index].products.findIndex(p => p.id === pid)
      const p = new ProductManager();
      const productInCart = p.getProductById(pid)

      if(typeof(productInCart)===Object && indexInCart === -1){
        this.#carts[index].products.push({ id:pid, 'quantity': 1})
      } else if(typeof(productInCart)===Object && indexInCart !== -1){
        ++this.#carts[index].products[indexInCart].quantity;
      }

      this.#saveCartsToFile();

      return "Producto agregado al carrito correctamente"
    }

}

export default CartsManager;