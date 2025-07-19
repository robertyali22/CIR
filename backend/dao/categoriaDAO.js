const db = require('../db');

const CategoriaDAO = {
  async insertar(categoria) {
    const { nombre, descripcion } = categoria;
    await db.query(
      'INSERT INTO categoria (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion]
    );
  },

  async obtenerTodos() {
    const [rows] = await db.query('SELECT * FROM categoria');
    return rows;
  }
};

module.exports = CategoriaDAO;
