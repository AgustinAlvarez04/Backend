import { Schema, model } from "mongoose";   //Importamos Schema y model desde mongoose para poder crear un modelo de datos

const userSchema = new Schema({     //Creamos un nuevo esquema de datos
  first_name: { type: String, required: true },  //Agregamos un campo first_name de tipo String y requerido
  last_name: { type: String, required: true },  //Agregamos un campo last_name de tipo String y requerido
  email: { type: String, required: true, unique: true },  //Agregamos un campo email de tipo String, requerido y unico
  age: { type: Number, required: true },   //Agregamos un campo age de tipo Number y requerido
  password: { type: String, required: true }, //Agregamos un campo password de tipo Boolean y requerido
  role: { type: String, default: "user" }, //Agregamos un campo role de tipo String y por defecto sera "user"
});

export const UserModel = model("users", userSchema); //Exportamos el modelo de datos con el nombre de Users