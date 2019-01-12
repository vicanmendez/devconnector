const express = require("express");
const router = express.Router();
//Cargamos el módulo de Usuario
const Usuario = require("../../modules/Usuario");

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
      //Si no existe el usuario, lo creamos
      const newUser = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        avatar: req.body.avatar,
        clave: req.body.clave
      });
    }
  });
});
module.exports = router;
