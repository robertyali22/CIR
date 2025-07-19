class Producto {
  constructor({ id_producto, nombre, precio, imagen }) {
    this.id = id_producto;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }
}

module.exports = Producto;
