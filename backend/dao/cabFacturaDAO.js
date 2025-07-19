const db = require('../db');

const CabFacturaDAO = {
  async insertar(cabFactura) {
    const { id_usuario, fecha, precioTotal } = cabFactura;
    await db.query(
      'INSERT INTO cab_factura (id_usuario, fecha, precioTotal) VALUES (?, ?, ?)',
      [id_usuario, fecha, precioTotal]
    );
  },

  async obtenerTodos() {
    const [rows] = await db.query('SELECT * FROM cab_factura');
    return rows;
  }
};

module.exports = CabFacturaDAO;
