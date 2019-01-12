const express = require("express");
const router = express.Router();

// @route GET api/perfil/test
// @descr Testear la ruta de perfiles
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Perfiles funcionando" }));

module.exports = router;
