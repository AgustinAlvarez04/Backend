import { Router } from "express"; //Nos permitira manejar los endpoints del servidor por fuera de app.js

const router = Router(); //instanciamos router

const users = [
  { username: "juan", password: "1234", admin: true },
  { username: "pedro", password: "1234", admin: false },
  { username: "maria", password: "1234", admin: false },
];

router.post("/login", (req, res) => {
  //Pagina para loguearse
  const { username, password } = req.body; //Extraemos el username y password del body
  const index = users.findIndex(
    //Buscamos el usuario en el array
    (user) => user.username === username && user.password === password //Si el usuario y contraseña coinciden
  );
  if (index < 0)
    //Si no existe el usuario
    return res //Retornamos un mensaje de error
      .status(401)
      .json({ message: "Usuario o contraseña incorrectos" });
  const user = users[index]; //Si existe el usuario
  req.session.info = {
    //Creamos la session del usuario
    loggedIn: true, //Usuario logueado
    count: 1, //Contador de sesiones
    admin: user.admin, //Si es admin o no
  };
  res.json({ message: "Usuario logueado con exito" }); //Retornamos un mensaje de exito
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