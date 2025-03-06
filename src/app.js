import express from 'express';  
import productRouter from './routes/products.router.js';           //Importamos todos los metodos manejables desde endpoints de productos

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {                                     //Pagina principal del sitio
    res.send("hola Mundo")
})

app.use('/products', productRouter);                            //Pagina para usar todos los metodos de PRODUCTS


app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});