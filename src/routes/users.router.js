import { Router } from "express"; //Nos permitira manejar los endpoints del servidor por fuera de app.js
import * as controllers from "../controllers/users.controller.js"; //Importamos los controladores de usuario
import passport from "passport";
import { passportCall } from "../passport/passportCall.js";
import { isAuth } from "../middlewares/isAuth.js";
import { extractTokenFromCookies, extractTokenFromHeaders } from "../middlewares/jwt.js";

const router = Router(); //instanciamos router

router.post("/register", controllers.register); //Endpoint para registrar un usuario

router.post("/login", controllers.login); //Endpoint para loguearse

router.get("/private", isAuth, (req,res) => res.send("ruta privada")); //Endpoint para loguearse

router.get("/logout", controllers.logout); //Endpoint para desloguearse

router.get("/info", controllers.info); //Endpoint para obtener la informacion del usuario


router.get("/private-headers", extractTokenFromHeaders, (req,res, next) => {
    try{
        if(!req.user) throw new Error("No autorizado");
        return res.json(req.user);
    } catch (error){
        next(error);
    }
});

router.get("/private-cookies", extractTokenFromCookies, (req,res, next) => {
    try{
        if(!req.user) throw new Error("No autorizado");
        return res.json(req.user);
    } catch (error){
        next(error);
    }
});

export default router; //Exportamos router
