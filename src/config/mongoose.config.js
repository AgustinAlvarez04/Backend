import { connect, Types } from "mongoose";                         //Importamos connect desde mongoose para realizar la conexion a nuestra base de datos
import 'dotenv/config';                                    //Importamos el modulo de variables de entorno

export const connectDB = async () => {                      //Funcion asincrona para conectar a la base de datos
    const URL = process.env.MONGO_URL;                      //Obtenemos la URL de la base de datos desde las variables de entorno

    try {                                                   //Intentamos conectar a la base de datos
        await connect(URL);                                 //Usamos la funcion connect de mongoose para conectarnos a la base de datos
        console.log("Conectado a MongoDB");                 //Si la conexion es exitosa, mostramos un mensaje en consola
    } catch (error) {   
        console.log("Error al conectar con MongoDB", error.message);            
    }
};

export const isValidID = (id) => {                          //Funcion para validar si un ID es valido
    return Types.ObjectId.isValid(id);
};