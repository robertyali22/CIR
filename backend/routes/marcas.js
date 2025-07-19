const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todas las marcas
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM marca");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener marcas:", error);
    res.status(500).json({ error: "Error al obtener marcas" });
  }
});

// Registrar nueva marca
router.post("/", async (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!nombre || !descripcion) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO marca (nombre, descripcion) VALUES (?, ?)",
      [nombre, descripcion]
    );

    res.status(201).json({
      mensaje: "Marca registrada",
      id: result.insertId,
      nombre,
      descripcion
    });
  } catch (err) {
    console.error("Error al agregar marca:", err);
    res.status(500).json({ error: "Error al registrar la marca" });
  }
});

// Eliminar marca por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM marca WHERE id_marca = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Marca no encontrada" });
    }

    res.json({ mensaje: "Marca eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar marca:", error);
    res.status(500).json({ error: "Error al eliminar marca" });
  }
});



module.exports = router;
