import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './todo.css';
import { FaTiktok, FaInstagram, FaFacebook, FaShoppingCart, FaPhoneAlt   } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";
import { FaLocationDot, FaPlus  } from "react-icons/fa6";
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { obtenerProductos } from '../services/api'; // Ajusta el path si es necesario


const Principal = () => {
  const [productos, setProductos] = useState([]);
  
    useEffect(() => {
    const fetchProductos = async () => {
      const data = await obtenerProductos();
      setProductos(data);
    };

    fetchProductos();
  }, []);
    
  return (
    <>
      <Navbar />

      <main>
        <div className="promocion">
          <img src="https://img.freepik.com/psd-gratis/plantilla-diseno-banners-ventas-viernes-negro-redes-sociales_47987-24564.jpg?semt=ais_hybrid&w=740" alt="Promoción" />
        </div>

        <div className="productos_populares">
      <h1>Productos Populares</h1>
      <div className="contenedor_productos_populares">
        {productos.map((producto) => (
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
        ))}
      </div>
    </div>
      </main>

      <Footer />
    </>
  );
};

export default Principal;
