import React, { useEffect, useState } from 'react';
import './todo.css';
import { FaTiktok, FaInstagram, FaFacebook, FaShoppingCart, FaPhoneAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdLogout, MdMailOutline } from "react-icons/md";
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { obtenerProductos } from '../services/api';


function Productos() {
  const [productos, setProductos] = useState([]);
  const [filtroMarca, setFiltroMarca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);

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
                <option value="amd">AMD</option>
                <option value="nvidia">NVIDIA</option>
                <option value="asus">ASUS</option>
                <option value="msi">MSI</option>
                <option value="gigabyte">Gigabyte</option>
                <option value="corsair">Corsair</option>
                <option value="kingston">Kingston</option>
                <option value="seagate">Seagate</option>
                <option value="western digital">Western Digital</option>
              </select>
            </div>
            <div className="filtro">
              <label htmlFor="categoria">Categoría:</label>
              <select id="categoria" value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
                <option value="">Todas</option>
                <option value="procesador">Procesadores</option>
                <option value="tarjeta grafica">Tarjetas Gráficas</option>
                <option value="placa madre">Placas Madre</option>
                <option value="memoria ram">Memoria RAM</option>
                <option value="almacenamiento">Almacenamiento</option>
                <option value="fuente de poder">Fuentes de Poder</option>
                <option value="refrigeracion">Refrigeración</option>
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
                <div className="carta" key={producto.id_producto}>
                  <div className="carta_imagen">
                    <img src={producto.imagen} alt={producto.nombre} />
                  </div>
                  <p className="name_producto">{producto.nombre}</p>
                  <p className="precio_producto">S/{producto.precio}</p>
                  <div className="agregar">
                    <i className="fas fa-plus"><FaPlus /> Agregar</i>
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
