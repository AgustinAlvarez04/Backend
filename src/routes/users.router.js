import { Router } from "express"; //Nos permitira manejar los endpoints del servidor por fuera de app.js

import * as controllers from "../controllers/users.controller.js"; //Importamos los controladores de usuario

const router = Router(); //instanciamos router

router.post("/register", controllers.register); //Endpoint para registrar un usuario

router.post("/login", controllers.login); //Endpoint para loguearse

router.get("/logout", controllers.logout); //Endpoint para desloguearse

router.get("/info", controllers.info); //Endpoint para obtener la informacion del usuario

export default router; //Exportamos router
