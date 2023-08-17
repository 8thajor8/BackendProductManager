const socket = io();

function addProduct() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const price = parseFloat(document.getElementById('price').value);
    const stock = parseInt(document.getElementById('stock').value);
    const category = document.getElementById('category').value;
    
    
    socket.emit('addProduct', {
        title: title,
        description: description,
        code: code,
        price: price,
        stock: stock,
        category: category
    });
}

function updateProduct() {
    socket.emit('updatedProduct', {
        id: id,
        property: property,
        newValue: newValue
    });
}

function deleteProduct() {
    socket.emit('deletedProduct', id);
}

// Listen for 'productUpdate' event from the server
socket.on('productUpdate', (updatedProductList) => {
    // Update the product list in the view with the updatedProductList
    // You can use DOM manipulation or a front-end framework like Vue or React
});