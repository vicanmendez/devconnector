//Módulo para los Usuarios en la Base de Datos
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Creamos un Schema para usuarios
const UserSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  clave: {
    type: String,
    required: true
  },
  avatar: {
    //Utilizamos String para el avatar para que se guarde la URL del servidor de Gravatar
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = Usuario = mongoose.model("usuario", UserSchema);
