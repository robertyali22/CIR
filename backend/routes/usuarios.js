const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

//registrar
router.post("/", usuarioController.registrarUsuario);

//login
router.post("/login", usuarioController.loginUsuario);

module.exports = router;
