import React, { useEffect, useState } from 'react';
import '../todo.css';
import Navbar_Admin from '../../components/Navbar_Admin';
import Footer_Admin from '../../components/Footer_Admin';
import axios from 'axios';

function Categoria() {
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  
  // Obtener todas las categorías al cargar
  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Error en el servidor");
      }

      const data = await res.json();
      alert("✅ " + data.mensaje); // Mostrar mensaje del backend
      setFormData({ nombre: "", descripcion: "" });
      await fetchCategorias(); // Recargar la tabla
    } catch (error) {
      console.error("Error al agregar categoría:", error);
      alert("❌ Hubo un problema al registrar la categoría.");
    }
  };


  const eliminarCategoria = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3001/api/categorias/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error("Error al eliminar");

      alert("Categoría eliminada correctamente");
      fetchCategorias(); // actualizar lista
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      alert("Hubo un problema al eliminar la categoría.");
    }
  };



  return (
    <div>
      <Navbar_Admin />
      <main className="gestion-main">
        <div className="gestion-container">
          <h2 className="subtitulo">Registrar Nueva Categoría</h2>
          <form className="gestion-form-grid" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
              <input type="text" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
            </div>
            <button type="submit" className="agregar">Agregar Categoría</button>
          </form>

          <h2 className="subtitulo">Lista de Categorías Registradas</h2>
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
                {categorias.map((cat) => (
                  <tr key={cat.id_categoria}>
                    <td>{cat.id_categoria}</td>
                    <td>{cat.nombre}</td>
                    <td>{cat.descripcion}</td>
                    <td>
                      <button className="btn-eliminar" onClick={() => eliminarCategoria(cat.id_categoria)}>
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

export default Categoria;
