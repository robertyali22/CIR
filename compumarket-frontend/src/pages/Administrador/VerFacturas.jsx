import React, { useEffect, useState } from 'react';
import Footer_Admin from '../../components/Footer_Admin';
import Navbar_Admin from '../../components/Navbar_Admin';

function VerFacturas() {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/facturas/admin/facturas')
      .then(res => res.json())
      .then(data => setFacturas(data))
      .catch(err => console.error('Error al obtener facturas:', err));
  }, []);

  

  return (
    <>
      <Navbar_Admin />
      <main className="gestion-main">
        <div className="gestion-container">
          <h2 className="subtitulo">📄 Facturas Registradas</h2>
          <div className="facturas-grid">
            {facturas.map((factura) => (
              <div key={factura.id_factura} className="factura-card">
                <h4><strong>Factura #{factura.id_factura}</strong></h4>
                <p><strong>🧑 Usuario:</strong> {factura.id_usuario}</p>
                <p><strong>📅 Fecha:</strong> {new Date(factura.fecha).toLocaleString()}</p>
                <p><strong>📦 Dirección:</strong> {factura.direccion}, {factura.ciudad}, {factura.region} - {factura.codigo_postal}</p>
                <p><strong>💳 Método de Pago:</strong> {factura.metodo_pago}</p>
                <p><strong>👤 Nombre en Tarjeta:</strong> {factura.nombre_tarjeta}</p>
                <p><strong>💰 Total:</strong> S/. {factura.precioTotal}</p>
                <hr style={{ margin: '0.75rem 0' }} />
                <h5><strong>🧾 Detalles:</strong></h5>
                <ul style={{ paddingLeft: '1rem' }}>
                  {factura.detalles.map((detalle, idx) => (
                    <li key={idx}>
                      🛒 Producto: <strong>{detalle.id_producto}</strong> | Cantidad: <strong>{detalle.cant_producto}</strong> | Subtotal: <strong>S/. {detalle.precio}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer_Admin />
    </>
  );
}

export default VerFacturas;
