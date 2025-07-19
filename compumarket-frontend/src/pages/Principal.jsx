import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate(); // ✅ HOOK DE NAVEGACIÓN

    useEffect(() => {
    const fetchProductos = async () => {
      const data = await obtenerProductos();
      setProductos(data);
    };

    fetchProductos();
  }, []);

  const handleAgregarAlCarrito = async (producto) => {
    const id_usuario = localStorage.getItem('userId');

    if (!id_usuario) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    try {
      // Obtener o crear el carrito
      const resCarrito = await fetch(`http://localhost:3001/api/carrito/${id_usuario}`);
      const dataCarrito = await resCarrito.json();
      const id_carrito = dataCarrito.id_carrito;

      // Agregar producto al carrito
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
              <div
                className="carta"
                key={producto.id_producto}
                style={{ cursor: 'pointer' }}
              >
                <div
                  className="carta_imagen"
                  onClick={() => navigate(`/producto/${producto.id_producto}`)} // ✅ NAVEGAR AL DETALLE
                >
                  <img src={producto.imagen} alt={producto.nombre} />
                </div>
                <p className="name_producto">{producto.nombre}</p>
                <p className="precio_producto">S/{producto.precio}</p>
                <div
                  className="agregar"
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ EVITAR NAVEGACIÓN AL HACER CLICK EN "AGREGAR"
                    handleAgregarAlCarrito(producto);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <FaPlus /> Agregar
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
