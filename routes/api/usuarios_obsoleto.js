/*
Clase con métodos OBSOLETOS, ¡NO FUNCIONA!
*/
const express = require("express");
const router = express.Router();
//Cargamos el módulo de Usuario
const Usuario = require("../../modules/Usuario");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
// @route GET api/usuarios/test
// @descr Testear la ruta de usuarios
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Usuarios funcionando" }));

// @route GET api/usuarios/register
// @descr Ruta para registrar usuarios
// @access Public
router.post("/register", (req, res) => {
  //Primero verificamos que el email no exista previamente
  Usuario.findOne({ email: req.body.email }).then(user => {
    if (user) {
      //Si hay un usuario con ese email retornamos error 400
      return res.status(400).json({ email: "Ya existe ese Email registrado" });
    } else {
      //Gravatar a partir de un email nos retorna un objeto con los datos del avatar
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //Default
      });
      //Si no existe el usuario, lo creamos
      const newUser = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        avatar: req.body.avatar,
        clave: req.body.clave
      });

      //Generamos un hash con Bcrypt para encriptar la clave
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.clave, salt, (err, hash) => {
          if (err) throw err;
          newUser.clave = hash;
          //Guardamos el newUser en la BD
          newUser
            .save()
            .then(usuario => res.json(usuario)) //respuesta exitosa, usuario creado
            .catch(err => console.log(err)); //Si algo no funcionó, lo mostramos por consola
        }); //fin callback hash
      }); //fin llamada al método getSalt
    } //fin ingreso de usaurio si no existe
  });
});
module.exports = router;
