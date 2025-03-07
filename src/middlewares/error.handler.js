export const errorHandler = (error, req, res, next) => {    //Manejador de errores
    console.log(error);     //Imprime el error en consola
    res.status(500).json({msg: error.message});  //Si hay un error, responde con un mensaje de error
}


