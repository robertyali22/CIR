class CabFactura {
  constructor({ id_factura, id_usuario, fecha, precioTotal }) {
    this.id = id_factura;
    this.id_usuario = id_usuario;
    this.fecha = fecha;
    this.precioTotal = precioTotal;
  }
}

module.exports = CabFactura;
