import React, { useEffect, useState } from 'react';
import { MdLogout, MdLogin } from 'react-icons/md';
import { IoMenu } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import '../pages/todo.css';

const Navbar_Admin = () => {
const [menuActive, setMenuActive] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const navigate = useNavigate();

useEffect(() => {
const userId = localStorage.getItem('userId');
setIsLoggedIn(!!userId);
}, []);

const toggleMenu = () => {
setMenuActive(!menuActive);
};

const handleLogout = () => {
localStorage.removeItem('usuario');
localStorage.removeItem('userId');
alert('👋 Has cerrado sesión.');
navigate('/login');
};

const handleLoginRedirect = () => {
navigate('/login');
};

return (
<header className="navbar">
<div className="logo">
<a href="/"><p className="CompuMarket">Admin - CompuMarket+</p></a>
</div>
     <nav className={`nav-links ${menuActive ? 'active' : ''}`} id="navLinks">
    <a href="/admin/productos">Gestionar Productos</a>
    <a href="/admin/usuarios">Usuarios</a>
    <a href="/admin/ventas">Ventas</a>

    {isLoggedIn ? (
      <button
        onClick={handleLogout}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          cursor: 'pointer',
        }}
      >
        <MdLogout /> Cerrar sesión
      </button>
    ) : (
      <button
        onClick={handleLoginRedirect}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          cursor: 'pointer',
        }}
      >
        <MdLogin /> Iniciar sesión
      </button>
    )}
  </nav>

  <div className="menu-toggle" id="menuToggle" onClick={toggleMenu}>
    <IoMenu />
  </div>
</header>
  );
};

export default Navbar_Admin;
