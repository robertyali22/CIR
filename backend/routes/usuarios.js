const express = require("express");
const router = express.Router();
const db = require("../db");
const usuarioController = require("../controllers/usuarioController");

//registrar
router.post("/", usuarioController.registrarUsuario);

//login
router.post("/login", usuarioController.loginUsuario);



router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuario');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Eliminar usuario por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

// Actualizar usuario por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, correo, telefono, direccion } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE usuario SET nombre = ?, apellido = ?, correo = ?, telefono = ?, direccion = ?, rol=? WHERE id_usuario = ?',
      [nombre, apellido, correo, telefono, direccion, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});




module.exports = router;
