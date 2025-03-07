import { Router } from "express"; //Nos permitira manejar los endpoints del servidor por fuera de app.js
import { userDao } from "../manager/user.manager.js";  //Importamos la instancia de la clase UserDao con el modelo de datos de usuarios

const router = Router(); //instanciamos router

router.post("/register", async (req, res) => {
  //Pagina para registrarse
  try {
    const {email, password} = req.body; //Extraemos el email y password del body
    let user = null;
    if(email === "adminCoder@coder.com" && password === "adminCod3r123") {
      user = await userDao.register ({
        ...req.body,
        role: "admin"
      })
    } else user = await userDao.register(req.body); //Registramos el usuario
    if (!user) return res.redirect("/errorRegister"); //Si el usuario ya existe
    return res.redirect("/login"); //Si el usuario se registro con exito
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; //Extraemos el username y password del body
    const user = await userDao.login(email, password); //Buscamos el usuario en la base de datos
    if (user) {
      req.session.email = email; //Guardamos el email en la session
      res.render("perfil", { user }); //Retornamos la pagina de perfil
    } else res.redirect("/login"); //Si el usuario no existe
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/logout", (req, res) => {
  //Pagina para desloguearse
  req.session.destroy(); //Destruimos la session
  res.json({ message: "Sesion cerrada" }); //Retornamos un mensaje de exito
});

router.get("/info", (req, res) => {
  //Pagina para obtener informacion de la session
  if (!req.session.info)
    return res.status(401).json({ message: "No autorizado" }); //Si no existe la session
  req.session.info.count++; //Aumentamos el contador de sesiones
  res.json(req.session.info); //Retornamos la informacion de la session
});

export default router; //Exportamos router
