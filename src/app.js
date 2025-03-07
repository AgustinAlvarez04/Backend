import express from "express";                                       //Importamos el modulo de express
import cookieParser from "cookie-parser";                            //Importamos el modulo de cookies
import 'dotenv/config';                                              //Importamos el modulo de variables de entorno
import productRouter from "./routes/products.router.js";             //Importamos todos los metodos manejables desde endpoints de productos
import { connectDB } from "./config/mongoose.config.js";             //Importamos la funcion de conexion a la base de datos
import { errorHandler } from "./middlewares/error.handler.js";       //Importamos el manejador de errores

const app = express();                                               //Creamos una instancia de express
const PORT = 8080;                                                   //Puerto en el que se ejecutara el servidor
const SECRET_KEY = process.env.SECRET_KEY;                           //Llave secreta para las cookies

app.use(cookieParser(SECRET_KEY));                                  //Usamos el modulo de cookies
app.use(express.json());                                            //Usamos el modulo de json
app.use(express.urlencoded({ extended: true }));                    //Usamos el modulo de urlencoded

app.get("/", (req, res) => {                                        //Pagina principal
  res.send("hola Mundo");
});

app.get("/set-cookie", (req, res) => {                                        //Pagina para setear una cookie
  res.cookie('idioma', 'ingles', {maxAge: 3000}).json({message: 'Cookie seteada'});          //res.cookie recibe clave y valor de la cookie
});

app.get("/set-signed-cookie", (req, res) => {                                        //Pagina para setear una cookie firmada
  res.cookie('nombre', 'raul', {maxAge: 3000, signed: true, httpOnly: true}).json({message: 'Cookie seteada'});          //res.cookie recibe clave y valor de la cookie
});

app.get("/get-cookie", (req, res) => {                                        //Pagina para obtener una cookie
  console.log(req.cookies);                                                   //req.cookies devuelve un objeto con todas las cookies
  const {idioma} = req.cookies;                                               //Extraemos la cookie idioma
  idioma === 'ingles' ? res.send({message: 'Hello'}) : res.send({message: 'Hola'});  //Si idioma es ingles, responde Ingles, sino Español
  
});

app.get("/get-signed-cookie", (req, res) => {                                        //Pagina para obtener una cookie firmada
  console.log(req.signedCookies);                                                   //req.cookies devuelve un objeto con todas las cookies
  const {idioma} = req.cookies;                                               //Extraemos la cookie idioma
  idioma === 'ingles' ? res.send({message: 'Hello'}) : res.send({message: 'Hola'});  //Si idioma es ingles, responde Ingles, sino Español
  
});

app.use("/products", productRouter);                                //Pagina para usar todos los metodos de PRODUCTS

app.use(errorHandler);                                              //Manejador de errores

connectDB();                                                       //Conexion a la base de datos

app.listen(PORT, () => {
  console.log(`Ejecutándose en http://localhost:${PORT}`);
});
