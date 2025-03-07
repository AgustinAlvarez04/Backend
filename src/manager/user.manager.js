import { UserModel } from "../models/user.model.js"; //Importamos el modelo de datos de usuarios

class UserDao {
  constructor(model) {
    this.model = model;
  }

  async register(user) {
    //Metodo para registrarse
    try {
      return await this.model.create(user); //Retornamos el usuario creado
    } catch (error) {
      //Si el usuario ya existia nos devolvera el error creado con anterioridad
      throw new Error(error);
    }
  }

  async login(email, password) {
    //Metodo para loguearse
    try {
      return await this.model.findOne(email, password); //Retornamos el usuario que tenga el email y password que le pasamos por parametros
    } catch (error) {
      //Si el usuario no se encuentra nos devolvera el error creado con anterioridad
      throw new Error(error);
    }
  }
}

export const userDao = new UserDao(UserModel); //Exportamos la instancia de la clase UserDao con el modelo de datos de usuarios
