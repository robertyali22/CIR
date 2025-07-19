import React, { useEffect, useState } from 'react';
import './todo.css';
import { FaTiktok, FaInstagram, FaFacebook, FaShoppingCart, FaPhoneAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdLogout, MdMailOutline } from "react-icons/md";
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { obtenerProductos } from '../services/api';
import { useNavigate } from 'react-router-dom';


function Productos() {
  const [productos, setProductos] = useState([]);
  const [filtroMarca, setFiltroMarca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const data = await obtenerProductos();
      setProductos(data);
      setProductosFiltrados(data);

      // Cargar marcas y categorías
      const resCat = await fetch('http://localhost:3001/api/categorias');
      const resMar = await fetch('http://localhost:3001/api/marcas');
      const dataCat = await resCat.json();
      const dataMar = await resMar.json();
      setCategorias(dataCat);
      setMarcas(dataMar);
    };

    cargarDatos();
  }, []);



  useEffect(() => {
    const cargarProductos = async () => {
      const data = await obtenerProductos(); // sin filtros
      setProductos(data);
      setProductosFiltrados(data);
    };

    cargarProductos();
  }, []);


  const filtrarProductos = async () => {
    const filtros = {
      marca: filtroMarca || undefined,
      categoria: filtroCategoria || undefined,
      precioMin: precioMin || undefined,
      precioMax: precioMax || undefined,
    };

    const data = await obtenerProductos(filtros);
    setProductosFiltrados(data);
  };

  const handleAgregarAlCarrito = async (producto) => {
  const id_usuario = localStorage.getItem('userId');

  if (!id_usuario) {
    alert('Debes iniciar sesión para agregar productos al carrito');
    return;
  }

  try {
    // Paso 1: Obtener o crear carrito
    const resCarrito = await fetch(`http://localhost:3001/api/carrito/${id_usuario}`);
    const dataCarrito = await resCarrito.json();
    const id_carrito = dataCarrito.id_carrito;

    // Paso 2: Agregar producto
    const res = await fetch('http://localhost:3001/api/carrito/agregar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_carrito,
        id_producto: producto.id_producto,
        cantidad: 1,
      }),
    });

    if (res.ok) {
      alert('✅ Producto agregado al carrito');
    } else {
      const errData = await res.json();
      alert('Error al agregar al carrito: ' + errData.mensaje);
    }
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    alert('Ocurrió un error al agregar al carrito');
  }
};


  return (
    <div>
      <Navbar />
      <main>
        <section className="productos">
          <div className="filtros">
            <div className="filtro">
              <label htmlFor="marca">Marca:</label>
              <select id="marca" value={filtroMarca} onChange={(e) => setFiltroMarca(e.target.value)}>
                <option value="">Todas</option>
                {marcas.map((marca) => (
                  <option key={marca.id_marca} value={marca.nombre.toLowerCase()}>{marca.nombre}</option>
                ))}
              </select>
            </div>
            <div className="filtro">
              <label htmlFor="categoria">Categoría:</label>
              <select id="categoria" value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                <option value="">Todas</option>
                {categorias.map((cat) => (
                  <option key={cat.id_categoria} value={cat.nombre.toLowerCase()}>{cat.nombre}</option>
                ))}
              </select>
            </div>
            <div className="filtro rango-precio">
              <label htmlFor="precio-min">Precio:</label>
              <input
                type="number"
                id="precio-min"
                placeholder="Mín."
                value={precioMin}
                onChange={(e) => setPrecioMin(e.target.value)}
              />
              <span> - </span>
              <input
                type="number"
                id="precio-max"
                placeholder="Máx."
                value={precioMax}
                onChange={(e) => setPrecioMax(e.target.value)}
              />
            </div>
            <button className="btn-filtrar" onClick={filtrarProductos}>Filtrar</button>
          </div>
        </section>

        <div className="productos_populares">
          <div className="contenedor_productos_populares">
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <div
                  className="carta"
                  key={producto.id_producto}
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    className="carta_imagen"
                    onClick={() => navigate(`/producto/${producto.id_producto}`)}
                  >
                    <img src={producto.imagen} alt={producto.nombre} />
                  </div>
                  <p className="name_producto">{producto.nombre}</p>
                  <p className="precio_producto">S/{producto.precio}</p>
                  <div
                    className="agregar"
                    onClick={(e) => {
                      e.stopPropagation(); // evita que se dispare el navigate
                      handleAgregarAlCarrito(producto);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <FaPlus /> Agregar
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron productos con esos filtros.</p>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Productos;
