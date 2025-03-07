import { error } from 'console';
import { productManager } from '../manager/product.manager.js'               //Importamos productManager desde manager para poder manejar los productos

export const getAll = async (req, res, next) => {                      //Para leer la informacion de todos los productos tenemos que crear un lugar a donde IR a leerlos
    try{
        const response = await productManager.getAll();         //Llamo al metodo getAll creado en productManager para mostrar todos los productos
        res.status(200).json(response)                            //Retorna los objetos 
    } catch {
        next(error);
    }
}

export const create = async (req, res, next) => {                      //Metodo para crear productos
    try{
        const response = await productManager.create(req.body);         //Llamo al metodo create para realizar la creacion de un producto nuevo mediante lo q ingresemos
        res.status(201).json(response)                            //Retorna el objeto nuevo
    } catch {
        next(error);
    }
}

export const getById =  async (req, res, next) => {                      //Metodo para encontrar por id un producto especifico
    try{
        const {id} = req.params                                     //El id va a ser el que nosotros pasemos por el REQ
        const response = await productManager.getById(id);                  //Llamo al metodo getById para pasar por parametro el producto que buscamos y q este lo encuentre
        if (!response) return res.status(404).json({ message: 'Product not found'});        //Si no existe el objeto nos devolvera el error
        res.status(200).json(response)                            //Retorna el objeto del id 
    } catch {
        next(error);                    //Si no encuentra el producto nos devolvera un error
    }
}

export const update = async (req, res, next) => {                      //Metodo para actualizar un producto
    try{
        const {id} = req.params                                     //El id va a ser el que nosotros pasemos por el REQ
        const response = await productManager.update(id, req.body);          //Llamo al metodo update para pasar por parametro el producto que queremos modificar y el id
        if (!response) return res.status(404).json({ message: 'Product not found'});      //Si no existe el objeto nos devolvera el error
        res.status(200).json(response)                            //Retorna el objeto actualizado
    } catch {
        next(error);                    //Si no encuentra el producto nos devolvera un error
    }
}

export const remove = async (req, res, next) => {                      //Metodo para eliminar un producto
    try{
        const {id} = req.params                                     //El id va a ser el que nosotros pasemos por el REQ
        const response = await productManager.delete(id);                  //Llamo al metodo delete para pasar por parametro el producto que queremos eliminar
        if (!response) return res.status(404).json({ message: 'Product not found'});      //Si no existe el objeto nos devolvera el error
        res.status(200).json({ message: 'Product deleted'});            //Retorna el mensaje de que el producto fue eliminado
    } catch {
        next(error);                    //Si no encuentra el producto nos devolvera un error
    }
}