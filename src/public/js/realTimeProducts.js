
const socket = io();

document.addEventListener('DOMContentLoaded', () => {
    
    const addProductBtn = document.getElementById('addProductBtn');
    const updateProductBtn = document.getElementById('updateProductBtn');
    const deleteProductBtn = document.getElementById('deleteProductBtn');
    
    addProductBtn.addEventListener('click', addProduct);
    updateProductBtn.addEventListener('click', updateProduct);
    deleteProductBtn.addEventListener('click', deleteProduct);
});

function addProduct(event) {
    event.preventDefault();
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

function updateProduct(event) {
    event.preventDefault();
    const updateProductId = parseInt(document.getElementById('updateProductId').value);
    const updateProperty = document.getElementById('updateProperty').value;
    const updateNewValue = document.getElementById('updateNewValue').value;

    socket.emit('updateProduct', {
        id: updateProductId,
        property: updateProperty,
        newValue: updateNewValue
    });
    
}

function deleteProduct(event) {
    event.preventDefault();
    const deleteProductId = parseInt(document.getElementById('deleteProductId').value);
    
    socket.emit('deleteProduct', {id: deleteProductId});
    
}


socket.on('productChange', () => {
    // Listen for the corresponding 'productChangeComplete' event
    
    location.reload();;
    
});
