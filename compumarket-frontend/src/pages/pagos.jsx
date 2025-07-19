import React, { useState } from 'react';
import './todo.css';
import { FaTiktok, FaInstagram, FaFacebook, FaShoppingCart, FaPhoneAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdLogout, MdMailOutline } from "react-icons/md";
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Pagos() {
  const [menuActivo, setMenuActivo] = useState(false);
  const toggleMenu = () => setMenuActivo(!menuActivo);

  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [region, setRegion] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [metodoPago, setMetodoPago] = useState('Tarjeta de crédito');
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaExp, setFechaExp] = useState('');
  const [cvv, setCvv] = useState('');

  const realizarPago = () => {
    console.log('Datos de envío y pago enviados:', {
      direccion, ciudad, region, codigoPostal, metodoPago,
      nombreTarjeta, numeroTarjeta, fechaExp, cvv
    });
    alert("✅ Pago procesado (simulado)");
  };

  return (
    <div>
      <Navbar />
      <main className="pago-main">
  <div className="formulario-pago">
    <h2 className="subtitulo">Dirección de Envío</h2>
    <div className="form-grid">
      <div className="form-group">
        <label htmlFor="direccion" className="visually-hidden">Dirección</label>
        <input type="text" id="direccion" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="ciudad" className="visually-hidden">Ciudad</label>
        <input type="text" id="ciudad" placeholder="Ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="region" className="visually-hidden">Región/Provincia</label>
        <input type="text" id="region" placeholder="Región/Provincia" value={region} onChange={(e) => setRegion(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="codigoPostal" className="visually-hidden">Código Postal</label>
        <input type="text" id="codigoPostal" placeholder="Código Postal" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} required />
      </div>
    </div>

    <h2 className="subtitulo">Método de Pago</h2>
    <div className="form-grid">
      <div className="form-group">
        <label htmlFor="metodoPago" className="visually-hidden">Método de Pago</label>
        <select id="metodoPago" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} required>
          <option value="">Seleccione un método</option>
          <option>Tarjeta de crédito</option>
          <option>Tarjeta de débito</option>
          <option>Yape/Plin</option>
          <option>Transferencia bancaria</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="nombreTarjeta" className="visually-hidden">Nombre en la tarjeta</label>
        <input type="text" id="nombreTarjeta" placeholder="Nombre en la tarjeta" value={nombreTarjeta} onChange={(e) => setNombreTarjeta(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="numeroTarjeta" className="visually-hidden">Número de tarjeta</label>
        <input type="text" id="numeroTarjeta" placeholder="Número de tarjeta" value={numeroTarjeta} onChange={(e) => setNumeroTarjeta(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="fechaExp" className="visually-hidden">Fecha Expiración</label>
        <input type="text" id="fechaExp" placeholder="MM/AA" value={fechaExp} onChange={(e) => setFechaExp(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="cvv" className="visually-hidden">CVV</label>
        <input type="text" id="cvv" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
      </div>
    </div>

    <button className="btn-pagar" onClick={realizarPago}>Realizar Pago</button>
  </div>
</main>

    <Footer />

    </div>
  );
}

export default Pagos;
