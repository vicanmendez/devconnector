const express = require("express");
const router = express.Router();

// @route GET api/posts/test
// @descr Testear la ruta de posts
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Posts funcionando" }));

module.exports = router;
