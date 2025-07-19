const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate que esta es tu conexión a MySQL

// 🛒 Obtener el carrito del usuario (y crear uno si no existe)
router.get('/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const [carrito] = await db.query('SELECT * FROM carrito WHERE id_usuario = ?', [id_usuario]);

    let id_carrito;
    if (carrito.length > 0) {
      id_carrito = carrito[0].id;
    } else {
      const [nuevo] = await db.query('INSERT INTO carrito (id_usuario) VALUES (?)', [id_usuario]);
      id_carrito = nuevo.insertId;
    }

    const [productos] = await db.query(`
      SELECT cd.id, cd.id_producto, p.nombre, p.precio, p.imagen, cd.cantidad
      FROM carrito_detalle cd
      JOIN producto p ON cd.id_producto = p.id_producto
      WHERE cd.id_carrito = ?`, [id_carrito]);

    res.json({ id_carrito, productos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al obtener el carrito" });
  }
});

// ➕ Agregar producto al carrito
router.post('/agregar', async (req, res) => {
  const { id_carrito, id_producto, cantidad } = req.body;

  try {
    const [existe] = await db.query(
      'SELECT * FROM carrito_detalle WHERE id_carrito = ? AND id_producto = ?',
      [id_carrito, id_producto]
    );

    if (existe.length > 0) {
      await db.query(
        'UPDATE carrito_detalle SET cantidad = cantidad + ? WHERE id_carrito = ? AND id_producto = ?',
        [cantidad, id_carrito, id_producto]
      );
    } else {
      await db.query(
        'INSERT INTO carrito_detalle (id_carrito, id_producto, cantidad) VALUES (?, ?, ?)',
        [id_carrito, id_producto, cantidad]
      );
    }

    res.json({ mensaje: 'Producto agregado al carrito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al agregar producto al carrito" });
  }
});

// ❌ Eliminar producto del carrito (por id del detalle)
router.delete('/eliminar/:id_detalle', async (req, res) => {
  const { id_detalle } = req.params;

  try {
    await db.query('DELETE FROM carrito_detalle WHERE id = ?', [id_detalle]);
    res.json({ mensaje: 'Producto eliminado del carrito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al eliminar producto del carrito" });
  }
});

// ✏️ Actualizar cantidad de un producto en el carrito
router.put('/actualizar-cantidad', async (req, res) => {
  const { id_carrito, id_producto, cantidad } = req.body;

  try {
    await db.query(
      'UPDATE carrito_detalle SET cantidad = ? WHERE id_carrito = ? AND id_producto = ?',
      [cantidad, id_carrito, id_producto]
    );
    res.json({ mensaje: 'Cantidad actualizada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al actualizar la cantidad" });
  }
});


module.exports = router;
