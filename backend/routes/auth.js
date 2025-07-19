const express = require("express");
const router = express.Router();
const db = require("../db");

// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
  const { nombre, apellido, correo, contrasena, telefono, direccion } = req.body;

  const sql = `
    INSERT INTO usuario (nombre, apellido, correo, contrasena, telefono, direccion)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db.query(sql, [nombre, apellido, correo, contrasena, telefono, direccion]);
    res.status(201).send("✅ Usuario registrado correctamente");
  } catch (err) {
    console.error("❌ Error al registrar usuario:", err);
    res.status(500).send("Error al registrar el usuario");
  }
});

// Ruta para login
router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM usuario WHERE correo = ?', [correo]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Correo no registrado' });
    }

    const usuario = rows[0];

    if (usuario.contrasena !== contrasena) {
      return res.status(401).json({ message: 'contrasena incorrecta' });
    }

    const { contrasena: _, ...usuarioSincontrasena } = usuario;
    res.json({ message: 'Inicio de sesión exitoso', usuario: usuarioSincontrasena });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});




module.exports = router;
