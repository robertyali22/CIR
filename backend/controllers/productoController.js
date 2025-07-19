const ProductoDAO = require("../dao/productoDAO");
const Producto = require("../models/Producto");

const productoController = {
  async obtenerProductos(req, res) {
    try {
      const productosDB = await ProductoDAO.obtenerTodos();
      const productos = productosDB.map((p) => new Producto(p));
      res.json(productos);
    } catch (error) {
      console.error("❌ Error al obtener productos:", error);
      res.status(500).json({ message: "Error al obtener productos" });
    }
  },
};

module.exports = productoController;
