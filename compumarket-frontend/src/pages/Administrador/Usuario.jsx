import React, { useEffect, useState } from 'react';
import '../todo.css';
import Navbar_Admin from '../../components/Navbar_Admin';
import Footer_Admin from '../../components/Footer_Admin';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(null);
  const [formEdit, setFormEdit] = useState({});

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/usuarios');
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  

  const eliminarUsuario = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        const res = await fetch(`http://localhost:3001/api/usuarios/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          alert("Usuario eliminado");
          fetchUsuarios();
        } else {
          alert("Error al eliminar");
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  const activarEdicion = (usuario) => {
    setModoEdicion(usuario.id_usuario);
    setFormEdit(usuario);
  };

  const handleEditChange = (e) => {
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
  };

  const guardarEdicion = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formEdit)
      });
      if (res.ok) {
        alert("Usuario actualizado");
        setModoEdicion(null);
        fetchUsuarios();
      } else {
        alert("Error al actualizar");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <div>
      <Navbar_Admin />
      <main className="gestion-main">
        <div className="gestion-container">
          <h2 className="subtitulo">Usuarios Registrados</h2>
          <div className="facturas-grid">
            {usuarios.map((usuario) => (
              <div className="factura-card" key={usuario.id_usuario}>
                {modoEdicion === usuario.id_usuario ? (
                  <>
                    <div className='form-group'>
                      <strong>Nombre:</strong>
                      <input type="text" name="nombre" value={formEdit.nombre} onChange={handleEditChange} />
                      <strong>Apellido:</strong>
                      <input type="text" name="apellido" value={formEdit.apellido} onChange={handleEditChange} />
                      <strong>Correo:</strong>
                      <input type="text" name="correo" value={formEdit.correo} onChange={handleEditChange} />
                      <strong>Telefono:</strong>
                      <input type="text" name="telefono" value={formEdit.telefono} onChange={handleEditChange} />
                      <strong>Dirección:</strong>
                      <input type="text" name="direccion" value={formEdit.direccion} onChange={handleEditChange} />
                      <strong>Rol:</strong>
                      <select name="rol" value={formEdit.rol} onChange={handleEditChange}>
                        <option value="usuario">Usuario</option>
                        <option value="admin">Administrador</option>
                      </select>
                      <div className="factura-botones">
                        <button onClick={() => guardarEdicion(usuario.id_usuario)} className="btn-actualizar">Guardar</button>
                        <button onClick={() => setModoEdicion(null)} className="btn-eliminar">Cancelar</button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p><strong>ID Usuario:</strong> {usuario.id_usuario}</p>
                    <p><strong>Nombre:</strong> {usuario.nombre}</p>
                    <p><strong>Apellido:</strong> {usuario.apellido}</p>
                    <p><strong>Correo:</strong> {usuario.correo}</p>
                    <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                    <p><strong>Dirección:</strong> {usuario.direccion}</p>
                    <p><strong>Rol:</strong> {usuario.rol}</p>
                    <div className="factura-botones">
                      <button onClick={() => activarEdicion(usuario)} className="btn-actualizar">Actualizar</button>
                      <button onClick={() => eliminarUsuario(usuario.id_usuario)} className="btn-eliminar">Eliminar</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer_Admin />
    </div>
  );
}

export default Usuarios;
