import React, { useEffect, useState } from 'react';
import './todo.css';
import { FaTiktok, FaInstagram, FaFacebook, FaShoppingCart, FaPhoneAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdLogout, MdMailOutline } from "react-icons/md";
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Pagos() {
  const navigate = useNavigate();

  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [region, setRegion] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [metodoPago, setMetodoPago] = useState('Tarjeta de crédito');
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaExp, setFechaExp] = useState('');
  const [cvv, setCvv] = useState('');

  const [carrito, setCarrito] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);

  const id_usuario = localStorage.getItem('userId');

  useEffect(() => {
    const obtenerCarrito = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/carrito/${id_usuario}`);
        const data = await res.json();

        if (data && data.productos) {
          setCarrito(data.productos);

          const total = data.productos.reduce(
            (acc, prod) => acc + prod.precio * prod.cantidad,
            0
          );
          setPrecioTotal(total);
        }
      } catch (error) {
        console.error('Error al obtener carrito:', error);
      }
    };

    obtenerCarrito();
  }, [id_usuario]);

  const realizarPago = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/facturas/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_usuario,
          direccion,
          ciudad,
          region,
          codigo_postal: codigoPostal,
          metodo_pago: metodoPago,
          nombre_tarjeta: nombreTarjeta,
          numero_tarjeta: numeroTarjeta,
          cvv,
          carrito,
          precioTotal
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Factura registrada correctamente');
        navigate('/'); // redirige a página principal
      } else {
        alert('❌ Error: ' + data.mensaje);
      }
    } catch (error) {
      console.error('Error al registrar la factura:', error);
      alert('Error al procesar el pago');
    }
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
