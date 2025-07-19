import React, { useEffect, useState } from 'react';
import '../todo.css';
import Navbar_Admin from '../../components/Navbar_Admin';
import Footer_Admin from '../../components/Footer_Admin';

function Marca() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: ""
  });

  
  const [marcas, setMarcas] = useState([]);

  // Obtener marcas desde backend
  const obtenerMarcas = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/marcas');
      const data = await response.json();
      setMarcas(data);
    } catch (error) {
      console.error("Error al obtener marcas:", error);
    }
  };

  useEffect(() => {
    obtenerMarcas();
  }, []);

  // Manejar cambios del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/marcas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Error en el servidor");

      alert("Marca agregada correctamente");
      setFormData({ nombre: "", descripcion: "" });
      obtenerMarcas(); // actualizar tabla
    } catch (error) {
      console.error("Error al agregar marca:", error);
      alert("Hubo un problema al registrar la marca.");
    }
  };

  const eliminarMarca = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta marca?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3001/api/marcas/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error("Error al eliminar");

      alert("Marca eliminada correctamente");
      obtenerMarcas(); // actualiza la tabla
    } catch (error) {
      console.error("Error al eliminar marca:", error);
      alert("Hubo un problema al eliminar la marca.");
    }
  };


  return (
    <div>
      <Navbar_Admin />
      <main className="gestion-main">
        <div className="gestion-container">
          <h2 className="subtitulo">Registrar Nueva Marca</h2>
          <form className="gestion-form-grid" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="agregar">Agregar Marca</button>
          </form>

          <h2 className="subtitulo">Lista de Marcas Registradas</h2>
          <div className="gestion-tabla">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {marcas.map((marca) => (
                  <tr key={marca.id_marca}>
                    <td>{marca.id_marca}</td>
                    <td>{marca.nombre}</td>
                    <td>{marca.descripcion}</td>
                    <td>
                      <button
                        className="btn-eliminar"
                        onClick={() => eliminarMarca(marca.id_marca)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer_Admin />
    </div>
  );
}

export default Marca;
