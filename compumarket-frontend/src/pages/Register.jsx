import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // <-- Importación añadida
import './todo.css';
import {
  FaTiktok,
  FaInstagram,
  FaFacebook,
  FaShoppingCart,
  FaPhoneAlt,
} from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdLogout, MdMailOutline } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
  const navigate = useNavigate(); // <-- Hook de navegación
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "", // <-- nombre corregido
    telefono: "",
    direccion: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/usuarios", formData);
      alert("✅ Usuario registrado correctamente");
      navigate("/login"); // <-- redirige al login después del registro
    } catch (error) {
      console.error("❌ Error al registrar usuario:", error.response?.data || error);
      alert("❌ Error al registrar usuario");
    }
  };

  return (
    <>
      <Navbar />

      <main
        style={{
          paddingTop: "6rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#e9ecf1",
            padding: "2rem",
            borderRadius: "15px",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <h2
            className="subtitulo"
            style={{ textAlign: "center", marginBottom: "1.5rem" }}
          >
            Crear una cuenta
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="correo">Correo electrónico</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          </div>

          <button
            className="agregar"
            type="submit"
            style={{ width: "100%", marginTop: "1.5rem" }}
          >
            Registrarse
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: "1rem",
              fontSize: "small",
            }}
          >
            ¿Ya tienes cuenta?{" "}
            <a
              href="/login"
              style={{ color: "#1561F0", textDecoration: "underline" }}
            >
              Inicia sesión
            </a>
          </p>
        </form>
      </main>

      <Footer />
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

export default Register;
