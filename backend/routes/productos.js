// backend/routes/productos.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// backend/routes/productos.js
router.get("/", async (req, res) => {
  const { marca, categoria, precioMin, precioMax } = req.query;

  let sql = `
    SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.stock, p.imagen, p.id_categoria, p.id_marca,
           c.nombre AS categoria,
           m.nombre AS marca
    FROM producto p
    JOIN categoria c ON p.id_categoria = c.id_categoria
    JOIN marca m ON p.id_marca = m.id_marca
    WHERE p.stock > 0
  `;
  const params = [];

  if (marca) {
    sql += " AND LOWER(m.nombre) LIKE ?";
    params.push(`%${marca.toLowerCase()}%`);
  }

  if (categoria) {
    sql += " AND LOWER(c.nombre) LIKE ?";
    params.push(`%${categoria.toLowerCase()}%`);
  }

  if (precioMin) {
    sql += " AND p.precio >= ?";
    params.push(precioMin);
  }

  if (precioMax) {
    sql += " AND p.precio <= ?";
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




// Registrar nuevo producto
router.post("/", async (req, res) => {
  const { nombre, descripcion, precio, stock, id_categoria, id_marca, imagen } = req.body;

  if (!nombre || !descripcion || !precio || !stock || !id_categoria || !id_marca || !imagen) {
    return res.status(400).json({ error: "Faltan datos para crear el producto" });
  }

  const sql = `INSERT INTO producto (nombre, descripcion, precio, stock, id_categoria, id_marca, imagen)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

  try {
    const [result] = await db.query(sql, [nombre, descripcion, precio, stock, id_categoria, id_marca, imagen]);
    
    res.status(201).json({
      mensaje: "Producto creado exitosamente",
      id: result.insertId,
      nombre,
      descripcion,
      precio,
      stock,
      id_categoria,
      id_marca,
      imagen
    });
  } catch (err) {
    console.error("❌ Error al insertar producto:", err);
    res.status(500).json({ error: "Error en el servidor al crear producto" });
  }
});


// PUT actualizar producto
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, id_categoria, id_marca, imagen } = req.body;

  try {
    await db.query(
      `UPDATE producto SET nombre = ?, descripcion = ?, precio = ?, stock = ?, id_categoria = ?, id_marca = ?, imagen = ?
      WHERE id_producto = ?`,
      [nombre, descripcion, precio, stock, id_categoria, id_marca, imagen, id]
    );
    res.json({ mensaje: "Producto actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});

// Ruta exclusiva para el administrador que no filtra por stock
// 🔹 Ruta para administrador (DEBE IR ANTES)
router.get("/admin", async (req, res) => {
  try {
    const [productos] = await db.query(`
      SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.stock, p.imagen,
             p.id_categoria, p.id_marca,
             c.nombre AS categoria,
             m.nombre AS marca
      FROM producto p
      JOIN categoria c ON p.id_categoria = c.id_categoria
      JOIN marca m ON p.id_marca = m.id_marca
    `);
    res.json(productos);
  } catch (error) {
    console.error("❌ Error al obtener productos para administrador:", error);
    res.status(500).json({ message: "Error al obtener productos para admin" });
  }
});



// DELETE eliminar producto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM producto WHERE id_producto = ?", [id]);
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT p.*, c.nombre AS categoria, m.nombre AS marca 
    FROM producto p
    LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
    LEFT JOIN marca m ON p.id_marca = m.id_marca
    WHERE p.id_producto = ?
  `;

  try {
    const [rows] = await db.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("❌ Error al obtener producto por ID:", error);
    res.status(500).json({ message: "Error al obtener producto" });
  }
});



module.exports = router;
