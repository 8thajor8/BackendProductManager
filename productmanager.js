const fs = require('fs');

class ProductManager{

    static id= 0;
    
    async init(){
        await this.loadProducts();
    }
    constructor(){
        this.products=[];
        this.path = 'files/db.json';
        this.init();
        
    }

    getProducts = () => {
        
        return this.products;
        
    }

    addProduct = (title,description,price,thumbnail,stock) => {
        
        if (!title || !description || !price || !thumbnail || !stock) {
            console.log('Todos los valores del producto son requeridos');
            return;
        }
        const product = {
            title,
            description,
            price,
            thumbnail,
            stock,
            
        }

        product.code=++ProductManager.id;

        this.products.push(product);
        console.log(product);
        this.saveProducts();

    }

    getProductById = (id) => {
        const productfound = this.products.find((product) => product.code === id);
        if(!productfound){
            console.log('No hay producto con ese ID');
            return;
        } else {
            console.log(productfound);
        }
    }

    updateProduct = (id, property, newValue) => {
        const productToUpdate = this.products.find((product) => product.code === id);

        if (!productToUpdate) {
            console.log('No hay producto con ese ID');
            return;
        }

        if (property === 'code') {
            console.log("No se permite cambiar el valor del ID");
            return;
        }

        if (productToUpdate.hasOwnProperty(property)) {
            productToUpdate[property] = newValue;
            this.saveProducts();
            console.log('Producto actualizado:', productToUpdate);
        } else {
            console.log('La propiedad indicada no existe');
        }
    }

    deleteProduct = (id) => {

        const deleteIndex = this.products.findIndex((product) => product.code === id);
        if (deleteIndex === -1) {
            console.log('No hay producto con ese ID');
            return;
        } else {
            const deletedProduct = this.products.splice(deleteIndex, 1);
            this.saveProducts();
            console.log('Producto eliminado:', deletedProduct[0]);
            
        }
    }

    

    async loadProducts() {
        try {
        
            if(fs.existsSync(this.path)){
                const data = fs.readFileSync(this.path, 'utf-8');
                const jsonData = JSON.parse(data);
                this.products = jsonData.products;
                ProductManager.id = jsonData.maxId;
                console.log('products loaded: ', jsonData.products)
                console.log('ID Max: ', jsonData.maxId)
            }
        } catch (error) {
            console.log('Error de carga de archivo');
        }

    }

    async saveProducts() {
        try {
            const data = JSON.stringify({products: this.products, maxId: ProductManager.id}, null, '\t');
            fs.writeFileSync(this.path, data, 'utf8');
            console.log('Los productos se han agregado al archivo:', this.path);
        } catch (error) {
            console.log('Ha ocurrido un error de escritura');
        }
    }
        
}

const productmanagertest = new ProductManager()
console.log(productmanagertest.getProducts())
productmanagertest.addProduct('testttitle','testdescription','textprice','testthumbnail','teststock')
productmanagertest.addProduct('testttitle2','testdescription2','textprice2','testthumbnail2','teststock2')
productmanagertest.addProduct('testdescription3','textprice3','testthumbnail3','teststock3')
productmanagertest.addProduct('testttitle4','testdescription4','textprice4','testthumbnail4','teststock4')
productmanagertest.getProductById(5)
productmanagertest.getProductById(2)
productmanagertest.deleteProduct(2)
productmanagertest.updateProduct(1, 'color', 'testeo de propiedad invalida')
productmanagertest.updateProduct(1, 'code', 10)
productmanagertest.updateProduct(1, 'title', 'Updated')
console.log(productmanagertest.getProducts())