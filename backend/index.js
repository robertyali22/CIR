const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const productosRoutes = require("./routes/productos");
const usuariosRoutes = require("./routes/usuarios");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/usuarios", usuariosRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend escuchando en http://localhost:${PORT}`);
});
