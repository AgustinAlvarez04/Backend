import { Schema, model } from "mongoose"; //Importamos Schema y model desde mongoose para poder crear un modelo de datos

const userSchema = new Schema({
  //Creamos un nuevo esquema de datos
  name: { type: String, required: true }, //Agregamos un campo first_name de tipo String y requerido
  email: { type: String, required: true, unique: true }, //Agregamos un campo email de tipo String, requerido y unico
  image: { type: String, default: "" }, //Agregamos un campo role de tipo String y por defecto sera "user"
  role: { type: String, default: "user" }, //Agregamos un campo role de tipo String y por defecto sera "user"
});

export const UserModel = model("users-github", userSchema); //Exportamos el modelo de datos con el nombre de Users
