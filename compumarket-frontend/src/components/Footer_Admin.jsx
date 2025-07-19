// src/components/Footer.jsx
import React from 'react';
import { FaTiktok, FaInstagram, FaFacebook, FaShoppingCart, FaPhoneAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdLogout, MdMailOutline } from "react-icons/md";
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import '../pages/todo.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footer_section">
          <h2 className="footer_logo">CompuMarket+</h2>
          <p>Tu tienda de tecnología de confianza. Ofrecemos productos de calidad al mejor precio.</p>
        </div>

        <div className="footer_section">
          <h3>Enlaces</h3>
          <ul>
            <li><a href="/productos_administrador">Producto</a></li>
            <li><a href="/categorias_administrador">Categoria</a></li>
            <li><a href="/marcas_administrador">Marca</a></li>
            <li><a href="/facturas_administrador">Facturas</a></li>
            <li><a href="/usuarios_administrador">Usuarios</a></li>
          </ul>
        </div>

        <div className="footer_section">
          <h3>Contacto</h3>
          <p><FaPhoneAlt /> +51 987 654 321</p>
          <p><MdMailOutline /> soporte@CompuMarket.pe</p>
          <p><FaLocationDot /> Lima, Perú</p>
        </div>

        <div className="footer_section">
          <h3>Síguenos</h3>
          <div className="social_icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTiktok /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="footer_bottom">
        <p>© 2024 CompuMarket. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
