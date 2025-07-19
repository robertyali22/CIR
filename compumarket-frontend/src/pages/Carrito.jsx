import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './todo.css';
import { Navigate, useNavigate } from 'react-router-dom';

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [idCarrito, setIdCarrito] = useState(null);
  const [total, setTotal] = useState(0);
    const navigate = useNavigate();


  useEffect(() => {
    const fetchCarrito = async () => {
      const id_usuario = localStorage.getItem('userId');
      if (!id_usuario) {
        alert('Debes iniciar sesión para ver tu carrito');
        return;
      }

      try {
        const res = await fetch(`http://localhost:3001/api/carrito/${id_usuario}`);
        const data = await res.json();

        if (data && data.productos) {
          setCarrito(data.productos);
          setIdCarrito(data.id_carrito);
          calcularTotal(data.productos);
        }
      } catch (err) {
        console.error('Error al cargar el carrito:', err);
        alert('Hubo un problema al cargar tu carrito.');
      }
    };

    fetchCarrito();
  }, []);

  const calcularTotal = (productos) => {
    const totalCalculado = productos.reduce(
      (acc, prod) => acc + prod.precio * prod.cantidad,
      0
    );
    setTotal(totalCalculado);
  };

  const eliminarProducto = async (idDetalle) => {
    try {
      await fetch(`http://localhost:3001/api/carrito/eliminar/${idDetalle}`, {
        method: 'DELETE',
      });
      // Filtra el producto eliminado del array
      const nuevoCarrito = carrito.filter((prod) => prod.id !== idDetalle);
      setCarrito(nuevoCarrito);
      calcularTotal(nuevoCarrito);
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      alert('Error al eliminar producto');
    }
  };

  const actualizarCantidad = async (id_producto, nuevaCantidad) => {
    if (nuevaCantidad <= 0) return;

    try {
      await fetch(`http://localhost:3001/api/carrito/actualizar-cantidad`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_carrito: idCarrito,
          id_producto,
          cantidad: nuevaCantidad
        })
      });

      const carritoActualizado = carrito.map((prod) =>
        prod.id_producto === id_producto
          ? { ...prod, cantidad: nuevaCantidad }
          : prod
      );
      setCarrito(carritoActualizado);
      calcularTotal(carritoActualizado);
    } catch (err) {
      console.error('Error al actualizar cantidad:', err);
      alert('No se pudo actualizar la cantidad');
    }
  };

  return (
    <>
      <Navbar />
      <main className="gestion-main">
        <div className="gestion-container">
          <h2 className="subtitulo" style={{ textAlign: 'center' }}>🛒 Carrito de Compras</h2>

          {carrito.length === 0 ? (
            <p style={{ textAlign: 'center', marginTop: '2rem' }}>Tu carrito está vacío.</p>
          ) : (
            <>
              <div className="carrito-lista">
                {carrito.map((prod) => (
                  <div className="carrito-item" key={prod.id_producto}>
                    <div className='carrito-img'>
                      <img className='imagen-carrito' src={prod.imagen} />
                    </div>
                    <div className="carrito-info">
                      <p><strong>{prod.nombre}</strong></p>
                      <p>S/. {prod.precio}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <label>Cantidad:</label>
                        <input
                          type="number"
                          value={prod.cantidad}
                          min={1}
                          style={{ width: '60px' }}
                          onChange={(e) =>
                            actualizarCantidad(prod.id_producto, parseInt(e.target.value))
                          }
                        />
                      </div>
                      <p><strong>Subtotal:</strong> S/. {(prod.precio * prod.cantidad).toFixed(2)}</p>
                    </div>
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarProducto(prod.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
                <button
                className="btn-pagar"
                style={{ marginTop: '1rem' }}
                onClick={() => navigate('/pagos')}
                >
                Realizar Pago
                </button>
              </div>

              <h3 style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                Total: <span style={{ color: '#1561F0' }}>S/. {total.toFixed(2)}</span>
              </h3>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Carrito;
