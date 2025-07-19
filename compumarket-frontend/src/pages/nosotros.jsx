import React from "react";
import "./todo.css"; // Asegúrate de que la ruta sea correcta
import { FaTiktok, FaInstagram, FaFacebook, FaShoppingCart, FaPhoneAlt   } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";





const Nosotros = () => {

  return (
    <>
      <Navbar />

      <main>
        <section className="sobre-nosotros">
          <div className="container_sobre">
            <h1>Sobre Nosotros</h1>

            <p className="intro">
              En CompuMarket entendemos que el mundo del hardware para
              computadoras evoluciona constantemente, impulsado por gamers,
              profesionales del diseño, editores de contenido y usuarios que
              buscan rendimiento sin compromisos. Sin embargo, también sabemos
              que encontrar componentes confiables, compatibles y a buen precio
              puede convertirse en un verdadero desafío.
            </p>

            <p>
              Por eso, nuestro propósito es claro: ofrecer una experiencia de
              compra digital moderna, segura y especializada. Sabemos que muchos
              usuarios pierden tiempo valioso buscando entre múltiples tiendas,
              comparando precios y sin recibir la asesoría adecuada. En
              CompuMarket cambiamos eso.
            </p>

            <p>
              Nuestra tienda nació con la visión de brindar no solo productos
              originales y de alta calidad, sino también orientación experta en
              cada paso del proceso. Con nuestra plataforma web, queremos
              facilitar la búsqueda, visualización y adquisición de componentes,
              permitiéndote conocer las características técnicas,
              compatibilidades y recomendaciones desde cualquier dispositivo.
            </p>

            <p>
              Con esta transformación digital, no solo modernizamos nuestro
              negocio, sino que también fortalecemos nuestra presencia en un
              mercado cada vez más exigente. CompuMarket busca posicionarse como
              un referente en la venta online de hardware, ofreciendo una
              plataforma clara, confiable y fácil de usar.
            </p>

            <p className="final">
              Bienvenido a la evolución digital de CompuMarket: donde la
              tecnología y la confianza se encuentran.
            </p>
          </div>
        </section>
        <br />
        <br />
      </main>

      <Footer />
    </>
  );
};

export default Nosotros;
