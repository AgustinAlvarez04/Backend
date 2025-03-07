import express from "express";
import productRouter from "./routes/products.router.js";             //Importamos todos los metodos manejables desde endpoints de productos
import { connectDB } from "./config/mongoose.config.js";             //Importamos la funcion de conexion a la base de datos
import { errorHandler } from "./middlewares/error.handler.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //Pagina principal del sitio
  res.send("hola Mundo");
});

app.use("/products", productRouter); //Pagina para usar todos los metodos de PRODUCTS

app.use(errorHandler);

connectDB();                         //Conexion a la base de datos

app.listen(PORT, () => {
  console.log(`Ejecutándose en http://localhost:${PORT}`);
});
