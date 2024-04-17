const socket = io();

socket.on('productos', productos => {
    const tbody = document.getElementById('body-products');
    tbody.innerHTML = '';

    productos.forEach(producto => {
        const row = tbody.insertRow();

        row.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.title}</td>
        <td>${producto.description}</td>
        <td>${producto.code}</td>
        <td>${producto.price}</td>
        <td>${producto.status}</td>
        <td>${producto.stock ? 'Activo': 'Desactivado'}</td>
        <td>${producto.category}</td>
        <td>${producto.thumbnails.length > 0 ? producto.thumbnails[0]: 'Sin imagen'}</td>
        `;
    });
})

const addProductForm = documet.getElementById('add-product-form');

addProductForm.addEventListener('submit', function (event) {
    event.preventDefault();

    //valores formulario
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;

    //Nuevo producto a enviar al servidor
    const product = {
        title: title,
        description: description,
        code: code,
        price: price,
        stock: stock,
        category: category
    };

    socket.emit('addProduct', product);
    addProductForm.requestFullscreen();

});