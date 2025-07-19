import { Navigate } from 'react-router-dom';

const RutaProtegidaAdmin = ({ children }) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario || usuario.rol !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaProtegidaAdmin;
