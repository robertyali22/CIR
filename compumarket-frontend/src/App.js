import logo from './logo.svg';
import './App.css';
import Register from "./pages/Register.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx';
import Nosotros from './pages/nosotros.jsx';
import ListaProductos from './pages/productos.jsx';
import Principal from './pages/Principal.jsx';
import Pagos from './pages/pagos.jsx';
import Producto from './pages/Administrador/Producto.jsx';
import Categoria from './pages/Administrador/Categoria.jsx';
import Marca from './pages/Administrador/Marca.jsx';
import Usuarios from './pages/Administrador/Usuario.jsx';
import DetalleProducto from './pages/DetalleProducto.jsx';
import Carrito from './pages/Carrito.jsx';
import VerFacturas from './pages/Administrador/VerFacturas.jsx';
import RutaProtegidaAdmin from './pages/Administrador/RutaProtegidaAdmin.jsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* CLIENTE VISTA */}
        <Route path='/nosotros' element={<Nosotros />} />
        <Route path='/productos' element={<ListaProductos />} />
        <Route path='/' element={<Principal />} />
        <Route path='/pagos' element={<Pagos />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path='/carrito' element={<Carrito />} />
        <Route path='/pagos' element={<Pagos />} />
        {/* ADMINISTRADOR VISTA */}
        <Route path='/productos_administrador' element={<RutaProtegidaAdmin><Producto /></RutaProtegidaAdmin>} />
        <Route path='/categorias_administrador' element={<RutaProtegidaAdmin><Categoria /></RutaProtegidaAdmin>} />
        <Route path='/marcas_administrador' element={<RutaProtegidaAdmin><Marca /></RutaProtegidaAdmin>} />
        <Route path='/facturas_administrador' element={<RutaProtegidaAdmin><VerFacturas /></RutaProtegidaAdmin>} />
        <Route path='/usuarios_administrador' element={<RutaProtegidaAdmin><Usuarios /></RutaProtegidaAdmin>} />

      </Routes>
    </Router>
  );
}

export default App;
