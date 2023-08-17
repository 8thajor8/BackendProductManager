
import ProductManager from '../productmanager.js';
import { Router } from 'express';


const router = Router();
const productManager = new ProductManager();



router.get('/', async (req, res)=>{
    const products = await productManager.getProducts();
    
    res.render('home',{
        style: 'home.css',
        title: 'Product Manager',
        products: products
    });

});

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();

    res.render('realTimeProducts', {
        style: 'realTimeProducts.css',
        title: 'Real-Time Product Manager',
        products: products 
    });
});



export default router;