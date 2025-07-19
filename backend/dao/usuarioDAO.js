const db = require('../db');

const UsuarioDAO = {
  async buscarPorCorreo(correo) {
    const [result] = await db.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
    return result.length > 0 ? result[0] : null;
  },

  async crear(usuario) {
    const { nombre, apellido, correo, contrasena, telefono, direccion } = usuario;
    await db.query(
      'INSERT INTO usuario (nombre, apellido, correo, contrasena, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, apellido, correo, contrasena, telefono, direccion]
    );
  }
};

module.exports = UsuarioDAO;
