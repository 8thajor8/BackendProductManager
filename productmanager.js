class ProductManager{

    static id= 0;

    constructor(){
        this.products=[];
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
        console.log(product)

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
}

const productmanagertest = new ProductManager()
console.log(productmanagertest.getProducts())
productmanagertest.addProduct('testttitle','testdescription','textprice','testthumbnail','teststock')
productmanagertest.addProduct('testttitle2','testdescription2','textprice2','testthumbnail2','teststock2')
productmanagertest.addProduct('testdescription3','textprice3','testthumbnail3','teststock3')
productmanagertest.addProduct('testttitle4','testdescription4','textprice4','testthumbnail4','teststock4')
productmanagertest.getProductById(5)
productmanagertest.getProductById(2)
console.log(productmanagertest.getProducts())