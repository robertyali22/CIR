
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/registrar', async (req, res) => {
  const {
    id_usuario,
    direccion,
    ciudad,
    region,
    codigo_postal,
    metodo_pago,
    nombre_tarjeta,
    numero_tarjeta,
    cvv,
    carrito,
    precioTotal
  } = req.body;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Insertar en cab_factura
    const [cabResult] = await conn.query(
      `INSERT INTO cab_factura (id_usuario, precioTotal, direccion, ciudad, region, codigo_postal, metodo_pago, nombre_tarjeta, numero_tarjeta, cvv)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id_usuario, precioTotal, direccion, ciudad, region, codigo_postal, metodo_pago, nombre_tarjeta, numero_tarjeta, cvv]
    );

    const id_factura = cabResult.insertId;

    // Insertar en det_factura
    for (const item of carrito) {
      await conn.query(
        `INSERT INTO det_factura (id_factura, id_producto, cant_producto, precio)
        VALUES (?, ?, ?, ?)`,
        [id_factura, item.id_producto, item.cantidad, item.precio * item.cantidad]
      );
    }

    // Restar stock por cada producto comprado
    for (const item of carrito) {
      const { id_producto, cantidad } = item;

      await conn.query(
        `UPDATE producto 
        SET stock = stock - ? 
        WHERE id_producto = ? AND stock >= ?`,
        [cantidad, id_producto, cantidad]
      );
    }

    // Limpiar carrito
    // Obtener el id_carrito del usuario
    const [carritoRes] = await conn.query(
      `SELECT id FROM carrito WHERE id_usuario = ?`,
      [id_usuario]
    );

    if (carritoRes.length > 0) {
      const id_carrito = carritoRes[0].id;

      await conn.query(
        `DELETE FROM carrito_detalle WHERE id_carrito = ?`,
        [id_carrito]
      );
    }




    await conn.commit();
    res.json({ mensaje: 'Factura registrada con éxito' });
  } catch (error) {
    await conn.rollback();
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar factura' });
  } finally {
    conn.release();
  }
});

// Obtener todas las facturas con sus detalles
router.get('/admin/facturas', async (req, res) => {
  const conn = await db.getConnection();
  try {
    const [cabeceras] = await conn.query('SELECT * FROM cab_factura');

    for (let factura of cabeceras) {
      const [detalles] = await conn.query(
        'SELECT * FROM det_factura WHERE id_factura = ?',
        [factura.id_factura]
      );
      factura.detalles = detalles;
    }

    res.json(cabeceras);
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    res.status(500).json({ mensaje: 'Error al obtener facturas' });
  } finally {
    conn.release();
  }
});


module.exports = router;