const db = require('../db');

const UsuarioDAO = {
  async buscarPorCorreo(correo) {
    const [result] = await db.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
    return result.length > 0 ? result[0] : null;
  },

  // UsuarioDAO.js
  async crear(usuario) {
    const sql = `INSERT INTO usuario (nombre, apellido, correo, contrasena, telefono, direccion, rol)
                VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      usuario.nombre,
      usuario.apellido,
      usuario.correo,
      usuario.contrasena,
      usuario.telefono,
      usuario.direccion,
      usuario.rol || 'cliente' // Si no se pasa, por defecto es 'cliente'
    ];
    const [result] = await db.query(sql, values);
    return result.insertId;
  }

};

module.exports = UsuarioDAO;
