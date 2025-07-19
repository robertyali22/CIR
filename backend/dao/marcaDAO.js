const db = require('../db');

const MarcaDAO = {
  async insertar(marca) {
    const { nombre, descripcion } = marca;
    await db.query(
      'INSERT INTO marca (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion]
    );
  },

  async obtenerTodos() {
    const [rows] = await db.query('SELECT * FROM marca');
    return rows;
  }
};

module.exports = MarcaDAO;
