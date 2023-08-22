import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import ProductManager from './productmanager.js';

const app = express();
const server = app.listen(8080, () => console.log('Servidor en puerto 8080'));
const io = new Server(server);
const productManager = new ProductManager();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

io.on('connection', socket => {
    console.log('User Connected');
    productsRouter.use((req, res, next) => {
        req.io = io;
        next();
    });

    

    socket.on('addProduct', (productData) => {
        
        const { title, description, code, price, stock, category } = productData;

        try {
            productManager.addProduct(title, description, code, price, stock, category);
            io.emit('productChange');
            
            socket.emit('addProductSuccess', { message: 'Product added successfully' });
            } catch (error) {
                socket.emit('addProductError', { error: 'Internal server error' });
            }
    });


    socket.on('updateProduct', (updateData) => {
        
        const { id, property, newValue } = updateData;
        
        try {
            productManager.updateProduct(id, property, newValue);
            io.emit('productChange');
            
            socket.emit('updateProductSuccess', { message: 'Product updated successfully' });
            } catch (error) {
                socket.emit('updateProductError', { error: 'Internal server error' });
            }
    });

    socket.on('deleteProduct', (deleteData) => {
        const { id } = deleteData;
        
        try {
            productManager.deleteProduct(id);
            io.emit('productChange');
            
            
            socket.emit('deleteProductSuccess', { message: 'Product deleted successfully' });
            } catch (error) {
                socket.emit('deleteProductError', { error: 'Internal server error' });
            }
    });
});

