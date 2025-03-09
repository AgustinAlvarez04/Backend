import { Router } from "express"; //Nos permitira manejar los endpoints del servidor por fuera de app.js
import * as controllers from "../controllers/users.controller.js"; //Importamos los controladores de usuario
import passport from "passport";
import { passportCall } from "../passport/passportCall.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router(); //instanciamos router

router.post("/register", passport.authenticate("register"), controllers.register); //Endpoint para registrar un usuario

router.post("/login", passport.authenticate("login"), controllers.login); //Endpoint para loguearse

router.get("/register-github", passportCall("github", { scope: ["user:email"] })); //Endpoint para registrar un usuario con github

router.get("/profile", passportCall("github", { scope: ["user:email"] }), controllers.GHProfile); //Endpoint para registrar un usuario con github

router.get("/private", isAuth, (req,res) => res.send("ruta privada")); //Endpoint para loguearse

router.get("/logout", controllers.logout); //Endpoint para desloguearse

router.get("/info", controllers.info); //Endpoint para obtener la informacion del usuario

export default router; //Exportamos router
