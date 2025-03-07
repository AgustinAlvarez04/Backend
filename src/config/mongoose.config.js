import { connect } from "mongoose";                         //Importamos connect desde mongoose para realizar la conexion a nuestra base de datos

export const connectDB = async () => {                      //Creamos una funcion asincrona para realizar la conexion a la base de datos
    try{
        await connect("mongodb+srv://agustin:1234@cluster0.jm6lw.mongodb.net/backend")        //Realizamos la conexion a la base de datos
        console.log("Conectado A la Base De Datos");          //En caso de que la conexion sea exitosa, mostramos un mensaje
    } catch (error) {                                       //En caso de que ocurra un error, lo mostramos en consola
        throw new Error(error);                             //Lanzamos un error
    }
} 
