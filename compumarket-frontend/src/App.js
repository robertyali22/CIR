import logo from './logo.svg';
import './App.css';
import Register from "./pages/Register.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx';
import Nosotros from './pages/nosotros.jsx';
import ListaProductos from './pages/productos.jsx';
import Principal from './pages/Principal.jsx';
import Pagos from './pages/pagos.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/nosotros' element={<Nosotros />} />
        <Route path='/productos' element={<ListaProductos />} />
        <Route path='/' element={<Principal />} />
        <Route path='/pagos' element={<Pagos />} />
        {/* Otras rutas como login, productos, etc */}
      </Routes>
    </Router>
  );
}

export default App;
