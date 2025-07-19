// backend/routes/productos.js
const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const { marca, categoria, precioMin, precioMax } = req.query;

  let sql = "SELECT id_producto, nombre, precio, imagen FROM producto WHERE 1=1";
  const params = [];

  if (marca) {
    sql += " AND LOWER(nombre) LIKE ?";
    params.push(`%${marca.toLowerCase()}%`);
  }

  if (categoria) {
    sql += " AND LOWER(nombre) LIKE ?";
    params.push(`%${categoria.toLowerCase()}%`);
  }

  if (precioMin) {
    sql += " AND precio >= ?";
    params.push(precioMin);
  }

  if (precioMax) {
    sql += " AND precio <= ?";
    params.push(precioMax);
  }

  try {
    const [productos] = await db.query(sql, params);
    res.json(productos);
  } catch (error) {
    console.error("❌ Error al obtener productos filtrados:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

module.exports = router;
