import express from "express"; //Importamos el modulo de express
import session from "express-session"; //Importamos el modulo de sesiones
import cookieParser from "cookie-parser"; //Importamos el modulo de cookies
import passport from "passport";  //Importamos el modulo de passport
import "dotenv/config"; //Importamos el modulo de variables de entorno
// import "./passport/local.strategy.js"; //Importamos la estrategia de autenticacion
import "./passport/github.strategy.js"; //Importamos la estrategia de autenticacion
import MongoStore from "connect-mongo";   //Importamos el modulo de mongo para guardar las sesiones


import { connectDB } from "./config/mongoose.config.js"; //Importamos la funcion de conexion a la base de datos
import { errorHandler } from "./middlewares/error.handler.js"; //Importamos el manejador de errores
import { config as configHandlebars } from "./config/handlebars.config.js"; //Importamos la configuracion de handlebars


import productRouter from "./routes/products.router.js"; //Importamos todos los metodos manejables desde endpoints de productos
import cookiesRouter from "./routes/cookies.router.js"; //Importamos todos los metodos manejables desde endpoints de cookies
import usersRouter from "./routes/users.router.js"; //Importamos todos los metodos manejables desde endpoints de usuarios
import viewsRouter from "./routes/views.router.js"; //Importamos todos los metodos manejables desde endpoints de vistas



const app = express(); //Creamos una instancia de express
const PORT = 8080; //Puerto en el que se ejecutara el servidor

configHandlebars(app); //Configuramos handlebars
connectDB(); //Conexion a la base de datos

app.use(cookieParser(process.env.SECRET_KEY)); //Usamos el modulo de cookies
app.use(express.json()); //Usamos el modulo de json
app.use(express.urlencoded({ extended: true })); //Usamos el modulo de urlencoded

const sessionConfig = {                         //Configuracion de la sesion
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL, //URL de la base de datos
    crypto: {secret: process.env.SECRET_KEY}, //Encripta la informacion de la session
    ttl: 30, //Tiempo de vida de la sesion
  }),
  secret: process.env.SECRET_KEY, //Llave secreta
  saveUninitialized: true, //Crea la sesion vacia
  resave: false, //Se guarda por mas que no se use
};

app.use(session(sessionConfig)); //Usamos el modulo de sesiones
app.use(passport.initialize()); //Inicializamos passport
app.use(passport.session()); //Usamos la session de passport


app.get("/", (req, res) => {res.render("home", { title: "HOME" }) }); //Pagina principal

app.use("/products", productRouter); //Pagina para usar todos los metodos de PRODUCTS
app.use("/cookies", cookiesRouter); //Pagina para usar todos los metodos de COOKIES
app.use("/users", usersRouter); //Pagina para usar todos los metodos de USERS
app.use("/views", viewsRouter); //Pagina para usar todos los metodos de VIEWS

app.use(errorHandler); //Manejador de errores

app.listen(PORT, () => {
  console.log(`Ejecutándose en http://localhost:${PORT}`);
});
