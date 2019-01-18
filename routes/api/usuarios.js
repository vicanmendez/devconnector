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

// @route POST api/usuarios/register
// @descr Ruta para registrar usuarios
// @access Public
router.post("/register", (req, res) => {
  if (!req.body) {
    console.log("No estan llegando los datos por POST");
  } else {
    //Verificamos si el usuario ya existe
    Usuario.findOne({ email: req.body.email }, (err, foundUser) => {
      //Si hubo un error, lo enviamos como response
      if (err) return res.status(400).json({ Error: err });
      //Si ya existe el usuario, también enviamos el mensaje correspondiente con error 400
      if (foundUser)
        return res
          .status(400)
          .json({ Error: "Ya existe ese correo registrado" });
      //Si no hubo problemas
      const { nombre, email, clave, avatar } = req.body;
      bcrypt.hash(clave, 10, (err, hash) => {
        //El método create se encarga de guardar los objetos en la BD
        Usuario.create(
          { nombre, email, clave: hash, avatar },
          (err, newUser) => {
            if (err) console.log(err);
            else res.json(newUser);
          }
        );
      });
    });
  } //endif
});

module.exports = router;
