// src/pages/CarritoContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [idCarrito, setIdCarrito] = useState(null);

  const idUsuario = localStorage.getItem("id_usuario"); // asegúrate que se guarda al hacer login

  const obtenerCarrito = async () => {
    if (!idUsuario) return;

    const res = await axios.get(`http://localhost:3001/api/carrito/${idUsuario}`);
    setCarrito(res.data.productos);
    setIdCarrito(res.data.id_carrito);
  };

  const agregarProducto = async (producto, cantidad = 1) => {
    if (!idCarrito) return;

    await axios.post('http://localhost:3001/api/carrito/agregar', {
      id_carrito: idCarrito,
      id_producto: producto.id_producto,
      cantidad,
    });
    obtenerCarrito();
  };

  const eliminarProducto = async (idDetalle) => {
    await axios.delete(`http://localhost:3001/api/carrito/eliminar/${idDetalle}`);
    obtenerCarrito();
  };

  useEffect(() => {
    obtenerCarrito();
  }, [idUsuario]);

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto, eliminarProducto }}>
      {children}
    </CarritoContext.Provider>
  );
};
