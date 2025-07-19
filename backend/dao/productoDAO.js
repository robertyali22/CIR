const db = require("../db");

const ProductoDAO = {
  async obtenerTodos() {
    const [productos] = await db.query(
      "SELECT id_producto, nombre, precio, imagen FROM producto"
    );
    return productos;
  },
};

module.exports = ProductoDAO;
