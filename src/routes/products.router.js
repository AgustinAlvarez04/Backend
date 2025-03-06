import { Router } from "express";               //Nos permitira manejar los endpoints del servidor por fuera de app.js
import * as controllers from '../controllers/products.controller.js'        //Importamos todos los controladores de productos para dejar mas limpia esta seccion

const router = Router();                        //instanciamos router

router.get('/', controllers.getAll);            //Mediante el controllers nos retorna todos los productos
router.post('/', controllers.create);           //Mediante el controllers creamos un producto nuevo
router.get('/:id', controllers.getById);        //Mediante el controllers nos retorna el producto introducido por id

export default router;                          //Exportamos para poder usarlos en app.js