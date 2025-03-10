import * as services from "../services/user.services.js";

export const register = async (req, res) => {
  try {
    const user = await services.register(req.body);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await services.login(email, password);
    const token = services.generateToken(user);
    // res.header("Authorization", token); //Agregamos el token en el header

    res.cookie("token", token, { httpOnly: true }); //Agregamos el token en las cookies

    res.json({ msg: "Logeado correctamente", user });
  } catch (error) {
    res.send(error.message);
  }
};

export const GHProfile = async (req, res) => {
  try {
    const user = req.user;
    res.json({ msg: "Logeado correctamente", user });
  } catch (error) {
    res.send(error.message);
  }
};

export const logout = async (req, res) => {
  //Pagina para desloguearse
  req.session.destroy(); //Destruimos la session
  res.json({ message: "Sesion cerrada" }); //Retornamos un mensaje de exito
};

export const info = async (req, res) => {
  //Pagina para obtener informacion de la session
  if (!req.session.info)
    return res.status(401).json({ message: "No autorizado" }); //Si no existe la session
  req.session.info.count++; //Aumentamos el contador de sesiones
  res.json(req.session.info); //Retornamos la informacion de la session
};
