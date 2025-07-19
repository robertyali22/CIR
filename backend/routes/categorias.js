const express = require('express');
const router = express.Router();
const connection = require('../db');

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const [results] = await connection.query('SELECT * FROM categoria');
    res.json(results);
  } catch (err) {
    console.error('Error al obtener categorías:', err);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// Registrar nueva categoría
router.post('/', async (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Faltan datos para registrar la categoría' });
  }

  try {
    const [result] = await connection.query(
      'INSERT INTO categoria (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion]
    );

    res.status(201).json({
      mensaje: 'Categoría registrada con éxito',
      id: result.insertId,
      nombre,
      descripcion
    });
  } catch (err) {
    console.error('Error al insertar categoría:', err);
    res.status(500).json({ error: 'Error al registrar categoría' });
  }
});

// Eliminar categoría por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await connection.query("DELETE FROM categoria WHERE id_categoria = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json({ mensaje: "Categoría eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar categoría:", error.message);
    res.status(500).json({ error: "Error al eliminar categoría" });
  }
});

module.exports = router;
