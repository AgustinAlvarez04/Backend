import { productManager } from '../manager/product.manager.js'               //Importamos productManager desde manager para poder manejar los productos

export const getAll = async (req, res) => {                      //Para leer la informacion de todos los productos tenemos que crear un lugar a donde IR a leerlos
    try{
        const response = await productManager.getAll();         //Llamo al metodo getAll creado en productManager para mostrar todos los productos
        res.status(200).json(response)                            //Retorna los objetos 
    } catch {
        console.log("Error");                                   //Si falla nos devolvera el error
        res.status(400).json({message: error.message });
    }
}

export const create = async (req, res) => {                      //Metodo para crear productos
    try{
        const response = await productManager.create(req.body);         //Llamo al metodo create para realizar la creacion de un producto nuevo mediante lo q ingresemos
        res.status(201).json(response)                            //Retorna el objeto nuevo
    } catch {
        console.log("Error");                                   //Si falla nos devolvera el error
        res.status(400).json({message: error.message });
    }
}

export const getById =  async (req, res) => {                      //Metodo para encontrar por id un producto especifico
    try{
        const {id} = req.params                                     //El id va a ser el que nosotros pasemos por el REQ
        const response = await productManager.getById(id);                  //Llamo al metodo getById para pasar por parametro el producto que buscamos y q este lo encuentre
        if (!response) return res.status(404).json({ message: 'Product not found'});        //Si no existe el objeto nos devolvera el error
        res.status(200).json(response)                            //Retorna el objeto del id 
    } catch {
        console.log("Error");                                   //Si falla nos devolvera el error
        res.status(400).json({message: error.message });
    }
}