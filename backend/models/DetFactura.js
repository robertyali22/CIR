class DetFactura {
  constructor({ id_factura, id_producto, cant_producto, precio }) {
    this.id_factura = id_factura;
    this.id_producto = id_producto;
    this.cant_producto = cant_producto;
    this.precio = precio;
  }
}

module.exports = DetFactura;
