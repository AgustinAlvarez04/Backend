import { Schema, model } from "mongoose";   //Importamos Schema y model desde mongoose para poder crear un modelo de datos

const ProductsSchema = new Schema({        //Creamos un nuevo esquema de datos
    name: { type: String, required: true },    //Agregamos un campo name de tipo String y requerido
    description: { type: String, required: true },    //Agregamos un campo description de tipo String y requerido
    price: { type: Number, required: true },    //Agregamos un campo price de tipo Number y requerido
    stock: { type: Number, required: true },    //Agregamos un campo stock de tipo Number y requerido
    category: { type: String, required: true }    //Agregamos un campo category de tipo String y requerido
}, {versionKey: false});    //Ocultamos el campo __v que se genera por defecto


export const ProductModel = model("products", ProductsSchema);    //Exportamos el modelo de datos con el nombre de products