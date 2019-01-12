const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

//Traemos las rutas de nuestros módulos de usuarios, perfiles y posts
const usuarios = require("./routes/api/usuarios");
const perfil = require("./routes/api/perfil");
const posts = require("./routes/api/posts");

const app = express();

//BD config
const db = require("./config/keys").mongoURI;

//conectar a mongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB conectado000"))
  .catch(err => console.log("Error al conectarse con la BD: " + err));

app.get("/", (req, res) => res.send("Hola mundo desde el servidor node.js"));

//Asociar rutas a determinadas URL
app.use("/api/usuarios", usuarios);
app.use("/api/perfil", perfil);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log("Servidor iniciado en el puerto " + port + "")
);
