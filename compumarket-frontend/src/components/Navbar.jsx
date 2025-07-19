// src/components/Navbar.jsx
import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { IoMenu } from 'react-icons/io5';
import '../pages/todo.css';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header className="navbar">
      <div className="logo">
        <a href="/"><p className="CompuMarket">CompuMarket+</p></a>
      </div>
      <nav className={`nav-links ${menuActive ? 'active' : ''}`} id="navLinks">
        <a href="/productos">Productos</a>
        <a href="/nosotros">Sobre Nosotros</a>
        <a href="/pagos"><FaShoppingCart /></a>
        <a href="/login"><MdLogout /></a>
      </nav>
      <div className="menu-toggle" id="menuToggle" onClick={toggleMenu}>
        <IoMenu />
      </div>
    </header>
  );
};

export default Navbar;
