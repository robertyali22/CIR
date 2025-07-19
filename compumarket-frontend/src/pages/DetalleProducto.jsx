import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './todo.css';

function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/productos/${id}`);
        const data = await res.json();
        setProducto(data);
      } catch (err) {
        console.error('Error al obtener producto:', err);
      }
    };

    fetchProducto();
  }, [id]);

  const handleAgregarAlCarrito = async () => {
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


  if (!producto) {
    return (
      <p style={{ paddingTop: '6rem', textAlign: 'center' }}>
        Cargando producto...
      </p>
    );
  }

  return (
    <>
      <Navbar />
      <main className="gestion-main">
        <div className="gestion-container" style={{ maxWidth: '600px' }}>
          <h2 className="subtitulo" style={{ textAlign: 'center' }}>
            {producto.nombre}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              style={{
                width: '100%',
                maxHeight: '500px',
                objectFit: 'contain',
                borderRadius: '10px',
              }}
            />
            <p><strong>Descripción:</strong> {producto.descripcion}</p>
            <p className="precio_producto">Precio: S/. {producto.precio}</p>
            <p><strong>Stock:</strong> {producto.stock}</p>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
            <p><strong>Marca:</strong> {producto.marca}</p>
            <div className="agregar" style={{ cursor: 'pointer' }} onClick={handleAgregarAlCarrito}>
              🛒 Agregar al carrito
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default DetalleProducto;
