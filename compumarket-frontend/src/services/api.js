// frontend/services/api.js
export const obtenerProductos = async (filtros = {}) => {
  const params = new URLSearchParams();

  if (filtros.marca) params.append('marca', filtros.marca);
  if (filtros.categoria) params.append('categoria', filtros.categoria);
  if (filtros.precioMin) params.append('precioMin', filtros.precioMin);
  if (filtros.precioMax) params.append('precioMax', filtros.precioMax);

  try {
    const response = await fetch(`http://localhost:3001/api/productos?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error en la petición:", error);
    return [];
  }
};
