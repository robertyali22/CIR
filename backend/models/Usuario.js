class Usuario {
  constructor({ id_usuario, nombre, apellido, correo, contrasena, telefono, direccion }) {
    this.id = id_usuario;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.contrasena = contrasena;
    this.telefono = telefono;
    this.direccion = direccion;
  }
}

module.exports = Usuario;
