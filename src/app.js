import express from 'express';
import ProductManager from './productmanager.js';
import productsRouter from './routes/products.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static('public'));

const productManager = new ProductManager();

app.use('/api/products', productsRouter);

app.listen(8080, () => {
    console.log('Servidor en puerto 8080');
});



