import fs from 'fs';


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

    addProduct = (title, description, code,  price, stock, category, thumbnail) => {
        
        if (!title || !description || !code || !price  || !stock) {
            console.log('Todos los valores del producto son requeridos');
            return;
        }

        if (typeof price !== 'number' || price <= 0) {
            console.log('El precio debe ser un número mayor que 0');
            return;
        }
    
           
        if (typeof stock !== 'number') {
            console.log('El stock debe ser un número');
            return;
        }
    
        
        const product = {
            id: ++ProductManager.id,
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnail
            
        }

        this.products.push(product);
        console.log(product);
        this.saveProducts();

    }

    getProductById = (id) => {
        const productfound = this.products.find((product) => product.id === id);
        if(!productfound){
            console.log('No hay producto con ese ID');
            return;
        } else {
            return productfound;
        }
    }

    updateProduct = (id, property, newValue) => {
        const productToUpdate = this.products.find((product) => product.id === id);

        if (!productToUpdate) {
            console.log('No hay producto con ese ID');
            return;
        }

        if (property === 'id') {
            console.log("No se permite cambiar el valor del ID");
            return;
        }

        if (property === 'price' || property === 'stock') {
            newValue = parseInt(newValue);
            
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

        const deleteIndex = this.products.findIndex((product) => product.id === id);
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

export default ProductManager;

