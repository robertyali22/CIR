const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const UsuarioDAO = require('../dao/usuarioDAO');

const usuarioController = {
  


  async registrarUsuario(req, res) {
    try {
      const datos = req.body;
      const usuario = new Usuario(datos);

      if (!usuario.nombre || !usuario.apellido || !usuario.correo || !usuario.contrasena || !usuario.telefono || !usuario.direccion) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
      }

      const existente = await UsuarioDAO.buscarPorCorreo(usuario.correo);
      if (existente) {
        return res.status(409).json({ message: 'El correo ya está registrado' });
      }

      function esContrasenaSegura(contrasena) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(contrasena);
      }
      if (!esContrasenaSegura(usuario.contrasena)) {
        return res.status(400).json({
          message: 'La contraseña debe tener mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un símbolo'
        });
      }


      usuario.contrasena = await bcrypt.hash(usuario.contrasena, 10);
      usuario.rol = 'cliente';
      await UsuarioDAO.crear(usuario);
      res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  },

  async loginUsuario(req, res) {
    try {
      const { correo, contrasena } = req.body;

      const usuario = await UsuarioDAO.buscarPorCorreo(correo);
      if (!usuario) {
        return res.status(401).json({ message: "Correo o contraseña incorrectos" });
      }

      const contraseñaValida = await bcrypt.compare(contrasena, usuario.contrasena);
      if (!contraseñaValida) {
        return res.status(401).json({ message: "Correo o contraseña incorrectos" });
      }

      // Opcional: elimina contraseña del objeto a devolver
      const { contrasena: _, ...usuarioSinContrasena } = usuario;

      res.status(200).json({ message: "Login exitoso", usuario: usuarioSinContrasena });
    } catch (error) {
      console.error("Error en el login:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

};



module.exports = usuarioController;
