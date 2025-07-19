const db = require('../db');

const DetFacturaDAO = {
  async insertar(detFactura) {
    const { id_factura, id_producto, cant_producto, precio } = detFactura;
    await db.query(
      'INSERT INTO det_factura (id_factura, id_producto, cant_producto, precio) VALUES (?, ?, ?, ?)',
      [id_factura, id_producto, cant_producto, precio]
    );
  },

  async obtenerTodos() {
    const [rows] = await db.query('SELECT * FROM det_factura');
    return rows;
  }
};

module.exports = DetFacturaDAO;
