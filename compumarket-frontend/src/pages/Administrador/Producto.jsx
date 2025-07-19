import React, { useEffect, useState } from 'react';
import '../todo.css';
import Navbar_Admin from '../../components/Navbar_Admin';
import Footer_Admin from '../../components/Footer_Admin';

function Productos() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    id_categoria: '',
    id_marca: '',
    imagen: ''
  });
  

  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [editData, setEditData] = useState({});

  const obtenerProductos = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/productos/admin');
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      console.error('Error al obtener productos:', err);
    }
  };

  const [categorias, setCategorias] = useState([]);
const [marcas, setMarcas] = useState([]);

useEffect(() => {
  obtenerProductos();
  fetch('http://localhost:3001/api/categorias')
    .then(res => res.json())
    .then(data => setCategorias(data))
    .catch(err => console.error('Error al obtener categorías:', err));

  fetch('http://localhost:3001/api/marcas')
    .then(res => res.json())
    .then(data => setMarcas(data))
    .catch(err => console.error('Error al obtener marcas:', err));
}, []);


  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      alert(data.mensaje || 'Producto registrado');
      setFormData({ nombre: '', descripcion: '', precio: '', stock: '', id_categoria: '', id_marca: '', imagen: '' });
      obtenerProductos();
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Error al registrar producto');
    }
  };

  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id_producto);
    setEditData(producto);
  };

  const handleEditChange = (e) => {
    setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const guardarEdicion = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      });
      const data = await res.json();
      alert(data.mensaje || 'Producto actualizado');
      setEditandoId(null);
      obtenerProductos();
    } catch (err) {
      console.error('Error al actualizar:', err);
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      const res = await fetch(`http://localhost:3001/api/productos/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      alert(data.mensaje || 'Producto eliminado');
      obtenerProductos();
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };

  return (
    <div>
    <Navbar_Admin />
    <main className="gestion-main">
      <div className="gestion-container">
        <h2 className="subtitulo">Registrar Producto</h2>
        <form onSubmit={handleSubmit} className="gestion-form-grid">
          {['nombre', 'descripcion', 'precio', 'stock', 'imagen'].map(field => (
            <div className="form-group" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="form-group">
            <label>Categoría</label>
            <select name="id_categoria" value={formData.id_categoria} onChange={handleChange} required>
              <option value="">Selecciona una categoría</option>
              {categorias.map(cat => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Marca</label>
            <select name="id_marca" value={formData.id_marca} onChange={handleChange} required>
              <option value="">Selecciona una marca</option>
              {marcas.map(m => (
                <option key={m.id_marca} value={m.id_marca}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="agregar">Registrar</button>
        </form>


        <h2 className="subtitulo" style={{ marginTop: '2rem' }}>Listado de Productos</h2>
        <div className="facturas-grid">
          {productos.map(producto => (
            <div key={producto.id_producto} className="factura-card">
              {editandoId === producto.id_producto ? (
                <>
                  <div className='form-group'>
                    <p><strong>ID:</strong> {producto.id_producto}</p>
                    <strong>Nombre:</strong>
                    <input type="text" name="nombre" value={editData.nombre} onChange={handleEditChange} />
                    <strong>Descripción:</strong>
                    <input type="text" name="descripcion" value={editData.descripcion} onChange={handleEditChange} />
                    <strong>Precio:</strong>
                    <input type="number" name="precio" value={editData.precio} onChange={handleEditChange} />
                    <strong>Stock:</strong>
                    <input type="number" name="stock" value={editData.stock} onChange={handleEditChange} />
                    <strong>Categoría:</strong>
                    <input type="text" name="id_categoria" value={editData.id_categoria} onChange={handleEditChange} />
                    <strong>Marca:</strong>
                    <input type="text" name="id_marca" value={editData.id_marca} onChange={handleEditChange} />
                    <strong>Imagen:</strong>
                    <input type="text" name="imagen" value={editData.imagen} onChange={handleEditChange} />
                    <div className="factura-botones">
                      <button className="btn-actualizar" onClick={() => guardarEdicion(producto.id_producto)}>Guardar</button>
                      <button className="btn-eliminar" onClick={() => setEditandoId(null)}>Cancelar</button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p><strong>ID:</strong> {producto.id_producto}</p>
                  <p><strong>Nombre:</strong> {producto.nombre}</p>
                  <p><strong>Descripción:</strong> {producto.descripcion}</p>
                  <p><strong>Precio:</strong> S/. {producto.precio}</p>
                  <p><strong>Stock:</strong> {producto.stock}</p>
                  <p><strong>Categoría:</strong> {producto.categoria}</p>
                  <p><strong>Marca:</strong> {producto.marca}</p>
                  <p><strong>Imagen:</strong> <a href={producto.imagen} target="_blank" rel="noreferrer">Ver imagen</a></p>
                  <div className="factura-botones">
                    <button className="btn-actualizar" onClick={() => iniciarEdicion(producto)}>Actualizar</button>
                    <button className="btn-eliminar" onClick={() => eliminarProducto(producto.id_producto)}>Eliminar</button>
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

export default Productos;
