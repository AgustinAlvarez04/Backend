import { ProductModel } from "../models/product.model.js"; //Importamos el modelo de datos de productos
class ProductManager {
    constructor(model){
        this.model = model;
    }

    async getAll(){                                         // Metodo para llamar a todos los objetos en "products.json"
        try {
            return await this.model.find({});               //Retornamos todos los objetos que se encuentren en nuestra base de datos, aca llega un array con todos los objetos
        } catch (error) {                               //Si la instancia falla
            throw new Error(error);             // Generara un nuevo error y nos lo mostrara
        }
    }                            

    async create(obj){                                  //Metodo para crear un nuevo objeto
        try {   
            return await this.model.create(obj);         //Retornamos el objeto creado
        } catch (error){                                                            //Si el archivo existia..
            throw new Error(error);                 //Nos devolvera un error
        }
    }

    async getById(id){
        try {
            return await this.model.findById(id);                                  //Retornamos el objeto que tenga el id que le pasamos por parametros, si no encuentra el documento retorna null
        } catch (error) {                                                           //Si el producto no se encuentra nos devolvera el error creado con anterioridad
            throw new Error (error);
        }
    }

    async update(obj, id){
        try {
            return await this.model.findByIdAndUpdate(id, obj, {new: true});        //Pasamos el id y el objeto a modificar y luego retornamos el objeto actualizado
        } catch (error) {
            throw new Error(error);
        }
    }

    async remove(id){
        try {
            return await this.model.findByIdAndDelete(id);                         //Pasamos el id y eliminamos el objeto    
        } catch {
            throw new Error(error);
        }
    }
}

export const productManager = new ProductManager(ProductModel); //Exportamos la instancia de la clase ProductManager con el modelo de datos de productos