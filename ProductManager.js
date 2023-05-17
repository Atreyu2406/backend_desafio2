/*
const fs = require(`fs`)

class ProductManager {
    constructor(path) {
        this.path = path
        this.products = []
        this.format = `utf-8`
        this.id = 0
    }
    
    getProducts = async() => {
        return JSON.parse(await fs.promises.readFile(this.path, this.format))
    }
    
    getProductsById = async (id) => {
        let contenidoGet = JSON.parse(await fs.promises.readFile(this.path, this.format))
        const product = contenidoGet.find(item => item.id === id)
        if (!product) {
            return console.log("Not Found ID")
        } else {
            return console.log(product)
        }
    }

    addProducts = async(title, description, price, code, stock, img) => {
        const users = await this.getProducts()
        this.id++
        users.push({id: this.id , title, description, price, code, stock, img})
        return await fs.promises.writeFile(this.path, JSON.stringify(users, null, `\t`))
    } 

    deleteProducts = async(id) => {
        let contenidoDel = JSON.parse(await fs.promises.readFile(this.path, this.format))
        const productDelete = contenidoDel.filter (item => item.id != id)
        return await fs.promises.writeFile(this.path, JSON.stringify(productDelete, null, `\t`))
    }
}

const manager = new ProductManager(`./productsDb.json`)

manager.addProducts(`Gaseosa`, `bebida cola`, 500, 1234, 6, "")
*/

const fs = require(`fs`)

class ProductManager {
    #products
    constructor(path) {
        this.#products = []
        this.path = path
        this.format = `utf-8`
    }

    getProducts = () => this.#products

    getProductsById = (id) => {
        const product = this.#products.find(item => item.id === id)
        if (!product) return "Not Found ID"
        return product
    }

    #generateId = () => (this.#products.length === 0 ? 1 : this.#products[this.#products.length-1].id + 1)

    #validate = (title, description, price, code, stock, img) => {
        if (!title || !description || !price || !code || !stock || !img) {
            return `[${title}]: Campos Incompletos`
        } else {
            const found = this.#products.find(item => item.code === code)
            if (!found) return true
            return `[${title}]: El código ya existe`
        }
    }
        
    addProducts = async(title, description, price, code, stock, img) => {
        if (this.#validate(title, description, price, code, stock, img) === true) {
            this.#products.push({id: this.#generateId(), title, description, price, code, stock, img}) 
            return await fs.promises.writeFile(this.path, JSON.stringify(this.#products, null, `\t`))
        } else {
            console.log(this.#validate(title, description, price, code, stock, img))
        }    
    }

    deleteProducts = async(id) => {
        let contenidoDel = JSON.parse(await fs.promises.readFile(this.path, this.format))
        const productDel = contenidoDel.filter (item => item.id != id)
        return await fs.promises.writeFile(this.path, JSON.stringify(productDel, null, `\t`))
    }

    // updateProducts = async (id, stock) => {
    //     let contenidoUp = JSON.parse(await fs.promises.readFile(this.path, this.format))
    //     const prod = contenidoUp.find(item => item.id === id)
    //     if (!prod) {
    //         return "Not Found ID"
    //     } else {
    //         prod.stock = stock
    //         return await fs.promises.writeFile(this.path, JSON.stringify(prod, null, `\t`))
    //     }
    // }
}

const product = new ProductManager(`./productsDb.json`)
product.addProducts(`Books`, `Libro género fantástico`, `8000`, `2574`, `12`, "https://http2.mlstatic.com/D_NQ_NP_941946-MLA46913432105_072021-V.jpg")
product.addProducts(`Computers`, `180000`, `1258`, `3`, "https://images.start.com.ar/EXO-L65-2.jpg")//Falta la descripción
product.addProducts(`Cell Phones`, `Samsung Galaxy`, `140000`, `1340`, `8`, "https://tienda.movistar.com.ar/media/catalog/produ…cf95fcf479279f9ae509ad/a/2/a23-negro-frente_1.png")
product.addProducts(`GPS`, `Garmin Portatil`, `6500`, `1340`, `6`, "https://m.media-amazon.com/images/I/71mxeYQJJFL.jpg") //Código repetido

//Lista de Productos
console.log(product.getProducts())
//Busqueda de productos por ID
console.log(product.getProductsById(2))
console.log(product.getProductsById(4))
//Productos eliminados
product.deleteProducts()
//Actualizar stock
// product.updateProducts(1, 1500)





