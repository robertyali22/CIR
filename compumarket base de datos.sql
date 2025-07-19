-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2025 a las 02:59:44
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `compumarket`
--
CREATE DATABASE IF NOT EXISTS `compumarket` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `compumarket`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cab_factura`
--

CREATE TABLE `cab_factura` (
  `id_factura` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `precioTotal` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre`, `descripcion`) VALUES
(1, 'Procesadores', 'Unidades centrales de procesamiento que determinan la velocidad y rendimiento general del sistema.'),
(2, 'Tarjetas Gráficas', 'Componentes dedicados al procesamiento de gráficos y renderizado de video.'),
(3, 'Placas Madre', 'Plataforma principal que conecta todos los componentes del sistema.'),
(4, 'Memoria RAM', 'Memoria de acceso aleatorio utilizada para almacenar datos temporales de forma rápida.'),
(5, 'Almacenamiento', 'Unidades HDD y SSD utilizadas para guardar datos y el sistema operativo.'),
(6, 'Fuentes de Poder', 'Suministran energía eléctrica a todos los componentes del PC.'),
(7, 'Refrigeración', 'Sistemas de ventilación y enfriamiento para mantener temperaturas óptimas.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `det_factura`
--

CREATE TABLE `det_factura` (
  `id_factura` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cant_producto` int(11) DEFAULT NULL,
  `precio` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `id_marca` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`id_marca`, `nombre`, `descripcion`) VALUES
(1, 'AMD', 'Competidor directo de Intel, conocido por sus CPUs Ryzen y GPUs Radeon.'),
(2, 'NVIDIA', 'Especialista en tarjetas gráficas de alto rendimiento y soluciones de inteligencia artificial.'),
(3, 'ASUS', 'Fabricante de placas base, laptops, tarjetas gráficas y otros periféricos.'),
(4, 'MSI', 'Reconocida por sus placas madre, tarjetas gráficas y equipos para gaming.'),
(5, 'Gigabyte', 'Ofrece componentes de alto rendimiento como motherboards, tarjetas de video y más.'),
(6, 'Corsair', 'Especialista en memorias RAM, fuentes de poder, gabinetes y periféricos gamer.'),
(7, 'Kingston', 'Conocido por sus memorias RAM, unidades SSD y almacenamiento flash.'),
(8, 'Seagate', 'Fabricante líder en discos duros y soluciones de almacenamiento.'),
(9, 'Western Digital', 'Competidor de Seagate en almacenamiento con discos HDD y SSD.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_marca` int(11) DEFAULT NULL,
  `imagen` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `descripcion`, `precio`, `stock`, `id_categoria`, `id_marca`, `imagen`) VALUES
(1, 'PROCESADOR AMD RYZEN 5 5500 ( 100-100000457BOX ) 4.2GHZ-16MB | AM4', 'Marca: AMD, Modelo: RYZEN 5 5500, Producto: Procesador, Procesador: AMD Ryzen, Núcleos: 6, Hilos: 12, Tipo de Memoria: DDR4, Velocidad: 3.6 GHz, Caché: 16MB, Velocidad de reloj Maximo: Hasta 4.2GHz, P', 1499.9, 15, 1, 1, 'https://www.infotec.com.pe/62390-thickbox_default/procesador-amd-ryzen-5-5500-100-100000457box-42ghz-16mb-am4.jpg'),
(3, 'TARJETA DE VIDEO ASUS DUAL RTX 5060 8GB GDDR7 ( DUAL-RTX5060-O8G ) 128 BITS ( 90YV0N12-M0AA00 )', 'Marca : Asus, Modelo : RTX 5060 DUAL, Producto : Tarjeta de Video, Procesador Grafico: Nvidia Geforce RTX 5060, Nvidia Cuda Cores : 3840, Capacidad: 8GB, Tipo de memoria : GDDR7, Reloj del motor : 256', 1899, 10, 2, 3, 'https://www.infotec.com.pe/96087-thickbox_default/tarjeta-de-video-asus-dual-rtx-5060-8gb-gddr7-dual-rtx5060-o8g-128-bits-90yv0n12-m0aa00-.jpg'),
(4, 'TARJETA DE VIDEO ASUS DUAL RTX 3060 12GB V2 OC EDITION GDDR6 (DUAL-RTX3060-O12G-V2) 192 BIT', 'Marca: ASUS, Modelo: RTX 3060 V2 OC EDITION, Producto: Tarjeta de Video, Procesador Grafico: RTX 3060, Arquitectura T.de Video: Ampere, Nvidia CUDA Cores: 3584, Capacidad: 12GB, Tipo de memoria: GDDR6', 2099, 8, 2, 3, 'https://www.infotec.com.pe/95158-thickbox_default/tarjeta-de-video-asus-dual-rtx-3060-12gb-v2-oc-edition-gddr6-dual-rtx3060-o12g-v2-192-bit.jpg'),
(5, 'MAINBOARD ASUS PRIME H610M-K D4 ( 90MB1A10-M0EAY0 ) LGA 1700', 'Marca: Asus, Modelo: PRIME H610M-K D4, Producto: Mainboard, Socket: LGA 1700, Chipset: H610, Capacidad: 64 GB, Tipo de Memoria: DDR4, Ranuras de expansión: 2, Iluminación: Sin RGB', 749.9, 12, 3, 3, 'https://www.infotec.com.pe/67864-thickbox_default/mainboard-asus-prime-h610m-k-d4-90mb1a10-m0eay0-lga-1700.jpg'),
(6, 'MAINBOARD ASUS PRIME A520M-K AMD RYZEN | DDR4 | AM4 (90MB1500 M0EAY0)', 'Marca: Asus, Modelo: PRIME A520M-K, Producto: Mainboard, Socket : AMD AM4, Chipset : AMD A520, Sistema Operativo : Windows® 10 64-bit, Capacidad : 64GB, Tipo de memoria : DDR4, Ranuras de expansión : ', 829, 10, 3, 3, 'https://www.infotec.com.pe/87952-thickbox_default/mainboard-asus-prime-a520m-k-amd-ryzen-ddr4-am4-90mb1500-m0eay0.jpg'),
(7, 'MEMORIA RAM CORSAIR VENGEANCE 64GB (2X32) DDR5 6000MHZ RGB (CMH64GX5M2B6000C30W)', 'Marca : Corsair, Modelo : Vengeance, Producto : Memoria RAM, Capacidad :64GB (2 x 32gb), Interfaz de memoria : DDR5, Velocidad del Bus : 6000 MHZ, Iluminación: RGB, SKUP: MEM-13', 359, 25, 4, 6, 'https://www.infotec.com.pe/95452-large_default/memoria-ram-corsair-vengeance-64gb-2x32-ddr5-6000mhz-rgb-cmh64gx5m2b6000c30w.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `correo`, `contrasena`, `telefono`, `direccion`) VALUES
(12, 'Juan', 'Pérez', 'juan@example.com', '$2b$10$hHeisSGMYLQ6.vm7eTT7Ge9/HMjjjwYIJVGAMEp0SptWmGGTtnxgu', 987654321, 'Av. Siempre Viva 123'),
(13, 'rene', 'garcia', 'rene@gmail.com', '$2b$10$f7H62CYPVE1/sgHZxekKaOlrzfjSbNbm0N7sUF2Gud3LJ8v2g8nFG', 123, 'asd'),
(14, 'julia', 'Pérez', 'jun@example.com', '$2b$10$SPeUy4zjRfPNbAFzmDQJ/erHj4aKz6b0L63GB.0Mw23DHY1iAtrWO', 987654321, 'Av. Siempre Viva 123'),
(15, 'eduardo', 'leon', 'alcala@gmail.com', '$2b$10$fyBnDNap7ik3A4KsiRgbUO5ldhc6KawTM1MngI50mxTushtYhZpsq', 920049366, 'asd');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cab_factura`
--
ALTER TABLE `cab_factura`
  ADD PRIMARY KEY (`id_factura`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `det_factura`
--
ALTER TABLE `det_factura`
  ADD PRIMARY KEY (`id_factura`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`id_marca`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_marca` (`id_marca`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cab_factura`
--
ALTER TABLE `cab_factura`
  ADD CONSTRAINT `cab_factura_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `det_factura`
--
ALTER TABLE `det_factura`
  ADD CONSTRAINT `det_factura_ibfk_1` FOREIGN KEY (`id_factura`) REFERENCES `cab_factura` (`id_factura`),
  ADD CONSTRAINT `det_factura_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`);
--
-- Base de datos: `la_casa_de_los_lentes`
--
CREATE DATABASE IF NOT EXISTS `la_casa_de_los_lentes` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `la_casa_de_los_lentes`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `montura`
--

CREATE TABLE `montura` (
  `codigoMontura` int(11) NOT NULL,
  `tipoMontura` varchar(100) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `longitudMontura` double DEFAULT NULL,
  `anchoPuente` double DEFAULT NULL,
  `longitudVarilla` double DEFAULT NULL,
  `longitudLente` double DEFAULT NULL,
  `linkFoto` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `montura`
--

INSERT INTO `montura` (`codigoMontura`, `tipoMontura`, `precio`, `longitudMontura`, `anchoPuente`, `longitudVarilla`, `longitudLente`, `linkFoto`) VALUES
(1, 'Acetato', 70.5, 54, 20, 140, 140, 'https://www.visioncenter.com.pe/cdn/shop/files/8053672357936_1_1000x1000.png?v=1720009609'),
(2, 'Titanio', 50, 50, 30, 120, 120, 'https://www.valkur.com.pe/cdn/shop/files/LUNA_a22aa55e-2634-4503-afdd-19f50db3c7b6_2.png?v=1686537445&width=1000'),
(3, 'Aleaciones Titanio', 80, 25, 23, 120, 123, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/18299814_1/w=1500,h=1500,fit=pad'),
(4, 'Plastico', 65, 20, 15, 100, 110, 'https://tonybernard.store/wp-content/uploads/2023/11/Diseno-sin-titulo-2023-11-28T122127.046.png'),
(5, 'Metal', 120, 62, 24, 120, 120, 'https://oechsle.vteximg.com.br/arquivos/ids/17414748-1000-1000/imageUrl_1.jpg?v=638505707534230000'),
(6, 'Berilio', 100, 12, 12, 12, 12, 'https://www.lentesplus.com/media/catalog/product/V/N/VNM.A6047.0GRY.54_image_2.png?auto=webp&format=png&width=960&height=1200&fit=cover'),
(7, 'Aleaciones Titanio', 120, 12, 12, 12, 12, 'https://centroniks.com/cdn/shop/products/CZG-LEN-01-13.webp?v=1652823639&width=1946'),
(8, 'Aleaciones Titanio', 120, 12, 12, 12, 12, 'https://www.visioncenter.com.pe/cdn/shop/files/8053672357936_1_1000x1000.png?v=1720009609');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `dniPaciente` int(11) NOT NULL,
  `nombrePaciente` varchar(100) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `fechaVisita` date DEFAULT NULL,
  `razonVisita` varchar(100) DEFAULT NULL,
  `enfermedades` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`dniPaciente`, `nombrePaciente`, `direccion`, `telefono`, `fechaVisita`, `razonVisita`, `enfermedades`) VALUES
(1200001, 'Giancarlo Jean', 'La Molina', 920049366, '2025-01-11', 'consulta', 'Astigmatismo'),
(10241559, 'Mirella Castro', 'Santa Anita - Agustino', 920149522, '2025-02-06', 'Compra', 'Astigmatismo'),
(41255558, 'Alessandro Chavez', 'Ate - Constructores', 952149355, '2025-01-25', 'RevisiÃ³n', 'Ninguno'),
(45218776, 'Monica Huaman', 'Miraflores 1046', 942158377, '2025-01-10', 'RevisiÃ³n', 'Miopia'),
(52419886, 'Juan Perez', 'La Molina 406', 945189355, '2025-02-01', 'Consulta', 'Daltonismo'),
(74215227, 'Ricardo Perez', 'Santa Anita', 987654321, '2025-02-06', 'Consulta', 'Catarata');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registroventa`
--

CREATE TABLE `registroventa` (
  `codigoBoleta` int(11) NOT NULL,
  `fechaCreacion` date DEFAULT NULL,
  `dniPaciente` int(11) NOT NULL,
  `esferaIzq` double DEFAULT NULL,
  `cilindroIzq` double DEFAULT NULL,
  `gradoIzq` double DEFAULT NULL,
  `distanciaIzq` double DEFAULT NULL,
  `esferaDer` double DEFAULT NULL,
  `cilindroDer` double DEFAULT NULL,
  `gradoDer` double DEFAULT NULL,
  `distanciaDer` double DEFAULT NULL,
  `codigoMontura` int(11) DEFAULT NULL,
  `tipoLuna` varchar(100) DEFAULT NULL,
  `costoTotal` int(11) DEFAULT NULL,
  `fechaEntrega` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registroventa`
--

INSERT INTO `registroventa` (`codigoBoleta`, `fechaCreacion`, `dniPaciente`, `esferaIzq`, `cilindroIzq`, `gradoIzq`, `distanciaIzq`, `esferaDer`, `cilindroDer`, `gradoDer`, `distanciaDer`, `codigoMontura`, `tipoLuna`, `costoTotal`, `fechaEntrega`) VALUES
(2, '2025-02-05', 74215227, 2, 12, 121, 2, 12, 12, 12, 1, 1, 'cr_39', 120, '2025-02-14'),
(10, '2025-05-02', 74215227, 1.2, 2.5, 2.1, 4.2, 1, 1.2, 1.6, 2.9, 2, 'trivex', 150, '2025-03-14'),
(1000004, '2025-01-25', 41255558, 1.2, 4, 3, 2, 1.5, 2.3, 4.5, 1.2, 5, 'trivex', 150, '2025-02-08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `nombreUsuario` varchar(100) NOT NULL,
  `apellidoUsuario` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`nombreUsuario`, `apellidoUsuario`, `correo`, `contrasena`) VALUES
('Alondra', 'Chilet', 'alondra@gmail.com', 'eduardo'),
('Eduardo', 'Leon', 'eduardo.leon.b3@gmail.com', '123'),
('Miguel', 'Dominguez', 'eduardo@gmail.com', '123456'),
('mario', 'gomez', 'gomez@gmail.com', '123'),
('gumball', 'waterson', 'gumball@gmail.com', 'darwin'),
('Julia', 'Guevara', 'julia@gmail.com', '1234'),
('Jesus', 'Levano', 'levano@example.com', 'edu'),
('Luigi', 'Bros', 'luigi@gmail.com', 'luigi'),
('Mario', 'Bros', 'mario@gmail.com', 'mario'),
('Salem', 'Machaca', 'salemma@gmail.com', '123'),
('Federico', 'Valverde', 'valverde@gmail.com', '123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `montura`
--
ALTER TABLE `montura`
  ADD PRIMARY KEY (`codigoMontura`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`dniPaciente`);

--
-- Indices de la tabla `registroventa`
--
ALTER TABLE `registroventa`
  ADD PRIMARY KEY (`codigoBoleta`),
  ADD KEY `codigoMontura` (`codigoMontura`),
  ADD KEY `dniPaciente` (`dniPaciente`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `registroventa`
--
ALTER TABLE `registroventa`
  ADD CONSTRAINT `registroventa_ibfk_1` FOREIGN KEY (`codigoMontura`) REFERENCES `montura` (`codigoMontura`),
  ADD CONSTRAINT `registroventa_ibfk_2` FOREIGN KEY (`dniPaciente`) REFERENCES `paciente` (`dniPaciente`);
--
-- Base de datos: `mi_base_de_datos`
--
CREATE DATABASE IF NOT EXISTS `mi_base_de_datos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mi_base_de_datos`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`) VALUES
(130, 'Juan Perez', 'juan.perez@example.com'),
(131, 'Felipe Santiago', 'felipe.santiago@gmail.com'),
(132, 'Felipe Santiago', 'felipe.santiago@gmail.com'),
(133, 'Felipe Santiago', 'felipe.santiago@gmail.com'),
(134, 'Felipe Santiago', 'felipe.santiago@gmail.com'),
(135, 'Anny Sanchez', 'felipe.santiago@gmail.com');
--
-- Base de datos: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) NOT NULL DEFAULT '',
  `user` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `query` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) NOT NULL,
  `col_name` varchar(64) NOT NULL,
  `col_type` varchar(64) NOT NULL,
  `col_length` text DEFAULT NULL,
  `col_collation` varchar(64) NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) DEFAULT '',
  `col_default` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `column_name` varchar(64) NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `transformation` varchar(255) NOT NULL DEFAULT '',
  `transformation_options` varchar(255) NOT NULL DEFAULT '',
  `input_transformation` varchar(255) NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) NOT NULL,
  `settings_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL,
  `export_type` varchar(10) NOT NULL,
  `template_name` varchar(64) NOT NULL,
  `template_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db` varchar(64) NOT NULL DEFAULT '',
  `table` varchar(64) NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) NOT NULL,
  `item_name` varchar(64) NOT NULL,
  `item_type` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Volcado de datos para la tabla `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"compumarket\",\"table\":\"usuario\"},{\"db\":\"compumarket\",\"table\":\"producto\"},{\"db\":\"compumarket\",\"table\":\"cab_factura\"},{\"db\":\"compumarket\",\"table\":\"marca\"},{\"db\":\"compumarket\",\"table\":\"categoria\"},{\"db\":\"la_casa_de_los_lentes\",\"table\":\"registroventa\"},{\"db\":\"la_casa_de_los_lentes\",\"table\":\"paciente\"},{\"db\":\"la_casa_de_los_lentes\",\"table\":\"usuario\"},{\"db\":\"la_casa_de_los_lentes\",\"table\":\"montura\"},{\"db\":\"proyectoalgoritmos\",\"table\":\"detfactura\"}]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) NOT NULL DEFAULT '',
  `master_table` varchar(64) NOT NULL DEFAULT '',
  `master_field` varchar(64) NOT NULL DEFAULT '',
  `foreign_db` varchar(64) NOT NULL DEFAULT '',
  `foreign_table` varchar(64) NOT NULL DEFAULT '',
  `foreign_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `search_name` varchar(64) NOT NULL DEFAULT '',
  `search_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `display_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `prefs` text NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

--
-- Volcado de datos para la tabla `pma__table_uiprefs`
--

INSERT INTO `pma__table_uiprefs` (`username`, `db_name`, `table_name`, `prefs`, `last_update`) VALUES
('root', 'la_casa_de_los_lentes', 'montura', '{\"sorted_col\":\"`montura`.`codigoMontura` ASC\"}', '2025-02-26 16:55:48'),
('root', 'la_casa_de_los_lentes', 'usuario', '[]', '2025-03-02 16:41:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text NOT NULL,
  `schema_sql` text DEFAULT NULL,
  `data_sql` longtext DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Volcado de datos para la tabla `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2025-06-14 00:59:33', '{\"Console\\/Mode\":\"collapse\",\"lang\":\"es\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) NOT NULL,
  `tab` varchar(64) NOT NULL,
  `allowed` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) NOT NULL,
  `usergroup` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Indices de la tabla `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Indices de la tabla `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Indices de la tabla `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Indices de la tabla `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Indices de la tabla `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Indices de la tabla `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Indices de la tabla `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Indices de la tabla `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Indices de la tabla `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Indices de la tabla `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Indices de la tabla `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Indices de la tabla `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Indices de la tabla `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Indices de la tabla `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Indices de la tabla `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Indices de la tabla `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Indices de la tabla `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Base de datos: `proyectoalgoritmos`
--
CREATE DATABASE IF NOT EXISTS `proyectoalgoritmos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `proyectoalgoritmos`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cabfactura`
--

CREATE TABLE `cabfactura` (
  `codigoFactura` int(11) NOT NULL,
  `dniCliente` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `precioFinal` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cabfactura`
--

INSERT INTO `cabfactura` (`codigoFactura`, `dniCliente`, `fecha`, `precioFinal`) VALUES
(1, 74215227, '2000-10-05', 1.5),
(2, 74215226, '2024-03-16', 10.7),
(3, 74215227, '2002-05-15', 20.5),
(4, 74215225, '2008-07-20', 100),
(5, 74215226, '2024-11-04', 60.3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `codigoCategoria` int(11) NOT NULL,
  `nameCategoria` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`codigoCategoria`, `nameCategoria`) VALUES
(1, 'Dulces'),
(2, 'Galletas'),
(3, 'Gaseosas'),
(4, 'Licores'),
(5, 'Snacks'),
(6, 'Vinos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `dniCliente` int(11) NOT NULL,
  `nameCliente` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`dniCliente`, `nameCliente`) VALUES
(63575812, 'Ricardo Jaime'),
(63575882, 'Sofia Huaman'),
(64216384, 'Emiliano Gomez'),
(74214110, 'Franco Escamilla'),
(74215210, 'Violeta Ramirez'),
(74215225, 'Victor Alcala'),
(74215226, 'Maria León'),
(74215227, 'Eduardo León'),
(74215287, 'Emiliano Gonzales'),
(74218997, 'Francisco Toledo'),
(85692336, 'Mateo Huaman'),
(94521228, 'Anderson Justo'),
(98456821, 'Roberto Gomez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detfactura`
--

CREATE TABLE `detfactura` (
  `codigoFactura` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantProduto` int(11) DEFAULT NULL,
  `precio` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detfactura`
--

INSERT INTO `detfactura` (`codigoFactura`, `idProducto`, `cantProduto`, `precio`) VALUES
(1, 2, 4, 10.5),
(1, 5, 6, 14),
(5, 3, 4, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `nameProducto` varchar(100) DEFAULT NULL,
  `nameCategoria` varchar(100) DEFAULT NULL,
  `nameProveedor` varchar(100) DEFAULT NULL,
  `precioUnit` double DEFAULT NULL,
  `fv` date DEFAULT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `nameProducto`, `nameCategoria`, `nameProveedor`, `precioUnit`, `fv`, `cantidad`) VALUES
(1, 'Coca Cola 1L', 'Gaseosas', 'Coca Cola', 4.2, '2024-06-02', 10),
(2, 'Sprite Lima Limon 3L', 'Gaseosas', 'Coca Cola', 6, '2024-06-02', 20),
(3, 'Fanta Kola Inglesa 3L', 'Gaseosas', 'Coca Cola', 6, '2024-06-02', 7),
(4, 'Inca Kola 1L', 'Gaseosas', 'Coca Cola', 4.2, '2024-06-02', 11),
(5, 'Animalitos Bolsa 500g ', 'Galletas', 'San Jorge S A', 5, '2024-06-02', 25),
(6, 'Vainilla Paquete 120g', 'Galletas', 'San Jorge S A', 1.7, '2024-06-02', 17),
(7, 'CASINO Sabor Menta Bolsa 43g Paquete 8un', 'Galletas', 'Alicorp Saa', 4.5, '2024-06-02', 13),
(8, 'CASINO Rellenas con Crema Sabor a Fresa Bolsa 43g Paquete 6un', 'Galletas', 'Alicorp Saa', 4.5, '2024-06-02', 9),
(9, 'CASINO Rellenas con Crema Sabor a Vainilla Bolsa 43g Paquete 6un', 'Galletas', 'Alicorp Saa', 4.5, '2024-06-02', 11),
(10, 'CASINO Rellenas con Crema Sabor a Lucuma Bolsa 43g Paquete 6un', 'Galletas', 'Alicorp Saa', 4.5, '2024-06-02', 11),
(11, 'CASINO Rellenas con Crema Sabor a Chocolate Bolsa 43g Paquete 6un', 'Galletas', 'Alicorp Saa', 4.5, '2024-06-02', 5),
(12, 'Papas Lays', 'Snacks', 'Lays', 2.5, '2024-06-02', 64),
(14, 'Frunas', 'Galletas', 'Alicorp Saa', 1, '2025-02-10', 24),
(15, 'Chips Ahoy', 'Galletas', 'Alicorp Saa', 1, '2025-02-10', 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `rucProveedor` int(11) NOT NULL,
  `nameProveedor` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`rucProveedor`, `nameProveedor`) VALUES
(201011552, 'Nestle'),
(201011557, 'Tabernero'),
(2010005523, 'Alicorp Saa'),
(2010009383, 'San Jorge S A'),
(2050243362, 'PepsiCo'),
(2147483647, 'Coca Cola');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cabfactura`
--
ALTER TABLE `cabfactura`
  ADD PRIMARY KEY (`codigoFactura`),
  ADD KEY `dniCliente` (`dniCliente`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`codigoCategoria`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`dniCliente`);

--
-- Indices de la tabla `detfactura`
--
ALTER TABLE `detfactura`
  ADD PRIMARY KEY (`codigoFactura`,`idProducto`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`rucProveedor`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cabfactura`
--
ALTER TABLE `cabfactura`
  ADD CONSTRAINT `cabfactura_ibfk_1` FOREIGN KEY (`dniCliente`) REFERENCES `clientes` (`dniCliente`);

--
-- Filtros para la tabla `detfactura`
--
ALTER TABLE `detfactura`
  ADD CONSTRAINT `detfactura_ibfk_1` FOREIGN KEY (`codigoFactura`) REFERENCES `cabfactura` (`codigoFactura`),
  ADD CONSTRAINT `detfactura_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`);
--
-- Base de datos: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
