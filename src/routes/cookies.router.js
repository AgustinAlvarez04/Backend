import { Router } from "express"; //Nos permitira manejar los endpoints del servidor por fuera de app.js

const router = Router(); //instanciamos router

router.get("/set-cookie", (req, res) => {
  //Pagina para setear una cookie
  res
    .cookie("idioma", "ingles", { maxAge: 3000 })
    .json({ message: "Cookie seteada" }); //res.cookie recibe clave y valor de la cookie
});

router.get("/set-signed-cookie", (req, res) => {
  //Pagina para setear una cookie firmada
  res
    .cookie("nombre", "raul", { maxAge: 3000, signed: true, httpOnly: true })
    .json({ message: "Cookie seteada" }); //res.cookie recibe clave y valor de la cookie
});

router.get("/get-cookie", (req, res) => {
  //Pagina para obtener una cookie
  console.log(req.cookies); //req.cookies devuelve un objeto con todas las cookies
  const { idioma } = req.cookies; //Extraemos la cookie idioma
  idioma === "ingles"
    ? res.send({ message: "Hello" })
    : res.send({ message: "Hola" }); //Si idioma es ingles, responde Ingles, sino Español
});

router.get("/get-signed-cookie", (req, res) => {
  //Pagina para obtener una cookie firmada
  console.log(req.signedCookies); //req.cookies devuelve un objeto con todas las cookies
  const { idioma } = req.cookies; //Extraemos la cookie idioma
  idioma === "ingles"
    ? res.send({ message: "Hello" })
    : res.send({ message: "Hola" }); //Si idioma es ingles, responde Ingles, sino Español
});



export default router;                          //Exportamos para poder usarlos en app.js