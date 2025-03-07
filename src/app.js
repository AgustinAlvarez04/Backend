import express from "express";                                       //Importamos el modulo de express
import cookieParser from "cookie-parser";                            //Importamos el modulo de cookies
import 'dotenv/config';                                              //Importamos el modulo de variables de entorno


import productRouter from "./routes/products.router.js";             //Importamos todos los metodos manejables desde endpoints de productos
import cookiesRouter from "./routes/cookies.router.js";              //Importamos todos los metodos manejables desde endpoints de cookies

import { connectDB } from "./config/mongoose.config.js";             //Importamos la funcion de conexion a la base de datos
import { errorHandler } from "./middlewares/error.handler.js";       //Importamos el manejador de errores
import { config as configHandlebars } from "./config/handlebars.config.js";    //Importamos la configuracion de handlebars


const app = express();                                               //Creamos una instancia de express
const PORT = 8080;                                                   //Puerto en el que se ejecutara el servidor
const SECRET_KEY = process.env.SECRET_KEY;                           //Llave secreta para las cookies

configHandlebars(app);                                              //Configuramos handlebars
connectDB();                                                       //Conexion a la base de datos

app.use(cookieParser(SECRET_KEY));                                  //Usamos el modulo de cookies
app.use(express.json());                                            //Usamos el modulo de json
app.use(express.urlencoded({ extended: true }));                    //Usamos el modulo de urlencoded


app.get("/", (req, res) => {                                        //Pagina principal
  res.send("hola Mundo");
});

app.use("/products", productRouter);                                //Pagina para usar todos los metodos de PRODUCTS
app.use("/cookies", cookiesRouter);                                 //Pagina para usar todos los metodos de COOKIES


app.use(errorHandler);                                              //Manejador de errores

app.listen(PORT, () => {
  console.log(`Ejecutándose en http://localhost:${PORT}`);
});
