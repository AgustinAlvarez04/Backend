import fs from "fs";                                          // FileSistem = FS
import { v4 as uuidv4 } from 'uuid';                        // Libreria para generar ids aleatorios

class ProductManager {
    constructor(path){
        this.path = path;
    }

    async getAll(){                                         // Metodo para llamar a todos los objetos en "products.json"
        try {
            if(fs.existsSync(this.path)){                   // Verificamos si el archivo existe en la ruta establecida
                const products = await fs.promises.readFile(this.path, 'utf-8');        // Si existe, lo lee.
                return JSON.parse(products);                                      // Y devuelve el array de productos en formato JSON
            }
            return [];                          // SI no encuentra nada me devuelve un array vacio
        } catch (error) {                               //Si la instancia falla
            throw new Error(error);             // Generara un nuevo error y nos lo mostrara
        }
    }                            

    async create(obj){                                  // Metodo para crear objetos en "products.json"
        try {   
            const product = {                           // Creo la instancia del id del objeto 
                id: uuidv4(),                           // Le paso su generacion de id y..
                ...obj                                  // Todo lo que pase va a entrar en el parametro "obj" que le pase al create
            };
            
            const products = await this.getAll();                                   //Llamo al array de productos ya sea vacio o con los objetos que tenga dentro  
            const productExist = await this.getById(product.id);                    // Verifico si el objeto existe para no crear objetos repetidos

            if (productExist) throw new Error('Este Producto ya existe');           //Si el producto existe nos mostrara el error, si no existe..
            products.push(product);                                                 //El objeto creado nos lo subira al array de productos
            await fs.promises.writeFile(this.path, JSON.stringify(products));       //Esto nos realizara la escritura del producto convirtiendolo
            return product;                                                         //Retornamos el producto creado

        } catch (error){                                                            //Si el archivo existia..
            throw error;                                                            //En la linea N29, falla y aca nos devolvera el error creado en esa instancia
        }
    }

    async getById(id){
        try {
            const products = await this.getAll();                                   //Llamo al array de productos ya sea vacio o con los objetos que tenga dentro  
            const product = products.find(product => product.id === id);            //Si el iterador encuentra el id que le estamos pasando por parametros, nos devovlera el producto
            if (!product) return null;              //Si el id no se encuentra nos creara este nuevo error
            return product;                                                         //Pero si el id si existe nos devolvera el producto especificado
        } catch (error) {                                                           //Si el producto no se encuentra nos devolvera el error creado con anterioridad
            throw new Error (error);
        }
    }

    async update(obj, id){
        try {
            const products = await this.getAll();                               //Llamo al array de productos ya sea vacio o con los objetos que tenga dentro  
            let productExist = await this.getById(id);                          //Si el iterador encuentra el id que le estamos pasando por parametros, nos devovlera el producto y sino nos dara error
            productExist = { ...productExist, ...obj };                         //Si lo encuentra, productExist me trae el objeto que ya existia y obj me agregara las nuevas propiedades
            const newArray = products.filter((prod) => prod.id !== id);         //Creamos nuevo array para actualizar la lista (ESTO SOLO ES POR USAR EL FILESYSTEM)
            newArray.push(productExist);                                        //Filtramos y eliminamos ese objeto q encontramos, y luego lo volvemos a agregar modificado
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));   //Lo convertimos y..    
            return productExist;                                                //Retornamos el producto actualizado
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id){
        try {
            const products = await this.getAll();                                       //Llamo al array de productos ya sea vacio o con los objetos que tenga dentro  
            const productExist = await this.getById(id);                                //Si el iterador encuentra el id que le estamos pasando por parametros, nos devovlera el producto y sino nos dara error
            const newArray = products.filter((prod) => prod.id !== id);                 //Creamos nuevo array para actualizar la lista (ESTO SOLO ES POR USAR EL FILESYSTEM)
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));           //Filtramos y eliminamos ese objeto q encontramos
            return productExist;                                                       //Retornamos el producto eliminado                
        } catch {
            throw new Error(error);
        }
    }
}

export const productManager = new ProductManager("./src/products.json")