-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: compumarket
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cab_factura`
--

DROP TABLE IF EXISTS `cab_factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cab_factura` (
  `id_factura` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `precioTotal` double DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `codigo_postal` varchar(10) DEFAULT NULL,
  `metodo_pago` varchar(50) DEFAULT NULL,
  `nombre_tarjeta` varchar(100) DEFAULT NULL,
  `numero_tarjeta` varchar(20) DEFAULT NULL,
  `cvv` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`id_factura`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `cab_factura_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cab_factura`
--

LOCK TABLES `cab_factura` WRITE;
/*!40000 ALTER TABLE `cab_factura` DISABLE KEYS */;
INSERT INTO `cab_factura` VALUES (3,16,'2025-07-13 11:48:43',100,'Av. Ejemplo 123','Lima','Lima Metropolitana','15001','Tarjeta de crédito','Juan Pérez','1234567890123456','123'),(4,16,'2025-07-13 11:52:23',20489.8,'asd','asd','asd','123','Tarjeta de débito','123','123','123'),(5,16,'2025-07-13 11:55:34',20489.8,'qwe','qwe','wqe','321','Yape/Plin','321','321','321'),(6,16,'2025-07-13 12:11:25',1077,'uio','uio','uio','567','Tarjeta de débito','iop','678','678'),(7,17,'2025-07-13 12:12:32',18,'qwe','qwe','qwe','123','Yape/Plin','asd','123','123'),(12,16,'2025-07-13 12:22:25',7046.9,'asd','asd','sad','123','Tarjeta de débito','asd','123','123'),(13,16,'2025-07-13 12:24:18',7046.9,'asd','asd','asd','123','Yape/Plin','asd','123','123'),(14,17,'2025-07-13 12:27:08',1206,'asd','asd','sad','123','Yape/Plin','asd','123','123'),(15,17,'2025-07-14 11:35:27',1499.9,'asd','asd','asd','123','Yape/Plin','123','123','123'),(16,17,'2025-07-14 11:38:12',1899,'asd','asd','asd','123','Tarjeta de débito','123','123','123');
/*!40000 ALTER TABLE `cab_factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (1,16,'2025-07-13 00:19:22'),(2,17,'2025-07-13 00:33:13');
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito_detalle`
--

DROP TABLE IF EXISTS `carrito_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrito_detalle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_carrito` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_carrito` (`id_carrito`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `carrito_detalle_ibfk_1` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id`),
  CONSTRAINT `carrito_detalle_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_detalle`
--

LOCK TABLES `carrito_detalle` WRITE;
/*!40000 ALTER TABLE `carrito_detalle` DISABLE KEYS */;
INSERT INTO `carrito_detalle` VALUES (23,1,23,1),(24,1,7,1),(29,2,7,1),(30,2,23,10);
/*!40000 ALTER TABLE `carrito_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Procesadores','Unidades centrales de procesamiento que determinan la velocidad y rendimiento general del sistema.'),(2,'Tarjetas Gráficas','Componentes dedicados al procesamiento de gráficos y renderizado de video.'),(3,'Placas Madre','Plataforma principal que conecta todos los componentes del sistema.'),(4,'Memoria RAM','Memoria de acceso aleatorio utilizada para almacenar datos temporales de forma rápida.'),(5,'Almacenamiento','Unidades HDD y SSD utilizadas para guardar datos y el sistema operativo.'),(6,'Fuentes de Poder','Suministran energía eléctrica a todos los componentes del PC.'),(7,'Refrigeración','Sistemas de ventilación y enfriamiento para mantener temperaturas óptimas.'),(27,'webiwabo','asd');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `det_factura`
--

DROP TABLE IF EXISTS `det_factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `det_factura` (
  `id_factura` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cant_producto` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_factura`,`id_producto`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `det_factura_ibfk_1` FOREIGN KEY (`id_factura`) REFERENCES `cab_factura` (`id_factura`) ON DELETE CASCADE,
  CONSTRAINT `det_factura_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `det_factura`
--

LOCK TABLES `det_factura` WRITE;
/*!40000 ALTER TABLE `det_factura` DISABLE KEYS */;
INSERT INTO `det_factura` VALUES (3,5,2,20.00),(3,6,3,20.00),(4,3,10,1899.00),(4,5,2,749.90),(5,3,10,18990.00),(5,5,2,1499.80),(6,7,3,1077.00),(7,23,1,18.00),(12,4,3,6297.00),(12,5,1,749.90),(13,4,3,6297.00),(13,5,1,749.90),(14,6,1,829.00),(14,7,1,359.00),(14,23,1,18.00),(15,1,1,1499.90),(16,3,1,1899.00);
/*!40000 ALTER TABLE `det_factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marca` (
  `id_marca` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (1,'AMD','Competidor directo de Intel, conocido por sus CPUs Ryzen y GPUs Radeon.'),(2,'NVIDIA','Especialista en tarjetas gráficas de alto rendimiento y soluciones de inteligencia artificial.'),(3,'ASUS','Fabricante de placas base, laptops, tarjetas gráficas y otros periféricos.'),(4,'MSI','Reconocida por sus placas madre, tarjetas gráficas y equipos para gaming.'),(5,'Gigabyte','Ofrece componentes de alto rendimiento como motherboards, tarjetas de video y más.'),(6,'Corsair','Especialista en memorias RAM, fuentes de poder, gabinetes y periféricos gamer.'),(7,'Kingston','Conocido por sus memorias RAM, unidades SSD y almacenamiento flash.'),(8,'Seagate','Fabricante líder en discos duros y soluciones de almacenamiento.'),(9,'Western Digital','Competidor de Seagate en almacenamiento con discos HDD y SSD.'),(17,'webiwabo','webiwabo');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_marca` int(11) DEFAULT NULL,
  `imagen` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_categoria` (`id_categoria`),
  KEY `id_marca` (`id_marca`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'PROCESADOR AMD RYZEN 5 5500 ( 100-100000457BOX ) 4.2GHZ-16MB | AM4','Marca: AMD, Modelo: RYZEN 5 5500, Producto: Procesador, Procesador: AMD Ryzen, Núcleos: 6, Hilos: 12, Tipo de Memoria: DDR4, Velocidad: 3.6 GHz, Caché: 16MB, Velocidad de reloj Maximo: Hasta 4.2GHz, P',1499.9,2,2,5,'https://www.infotec.com.pe/62390-thickbox_default/procesador-amd-ryzen-5-5500-100-100000457box-42ghz-16mb-am4.jpg'),(3,'TARJETA DE VIDEO ASUS DUAL RTX 5060 8GB GDDR7 ( DUAL-RTX5060-O8G ) 128 BITS ( 90YV0N12-M0AA00 )','Marca : Asus, Modelo : RTX 5060 DUAL, Producto : Tarjeta de Video, Procesador Grafico: Nvidia Geforce RTX 5060, Nvidia Cuda Cores : 3840, Capacidad: 8GB, Tipo de memoria : GDDR7, Reloj del motor : 256',1909,3,2,2,'https://www.infotec.com.pe/96087-thickbox_default/tarjeta-de-video-asus-dual-rtx-5060-8gb-gddr7-dual-rtx5060-o8g-128-bits-90yv0n12-m0aa00-.jpg'),(4,'TARJETA DE VIDEO ASUS DUAL RTX 3060 12GB V2 OC EDITION GDDR6 (DUAL-RTX3060-O12G-V2) 192 BIT','Marca: ASUS, Modelo: RTX 3060 V2 OC EDITION, Producto: Tarjeta de Video, Procesador Grafico: RTX 3060, Arquitectura T.de Video: Ampere, Nvidia CUDA Cores: 3584, Capacidad: 12GB, Tipo de memoria: GDDR6',2099,8,2,3,'https://www.infotec.com.pe/95158-thickbox_default/tarjeta-de-video-asus-dual-rtx-3060-12gb-v2-oc-edition-gddr6-dual-rtx3060-o12g-v2-192-bit.jpg'),(5,'MAINBOARD ASUS PRIME H610M-K D4 ( 90MB1A10-M0EAY0 ) LGA 1700','Marca: Asus, Modelo: PRIME H610M-K D4, Producto: Mainboard, Socket: LGA 1700, Chipset: H610, Capacidad: 64 GB, Tipo de Memoria: DDR4, Ranuras de expansión: 2, Iluminación: Sin RGB',749.9,12,3,3,'https://www.infotec.com.pe/67864-thickbox_default/mainboard-asus-prime-h610m-k-d4-90mb1a10-m0eay0-lga-1700.jpg'),(6,'MAINBOARD ASUS PRIME A520M-K AMD RYZEN | DDR4 | AM4 (90MB1500 M0EAY0)','Marca: Asus, Modelo: PRIME A520M-K, Producto: Mainboard, Socket : AMD AM4, Chipset : AMD A520, Sistema Operativo : Windows® 10 64-bit, Capacidad : 64GB, Tipo de memoria : DDR4, Ranuras de expansión : ',829,10,3,3,'https://www.infotec.com.pe/87952-thickbox_default/mainboard-asus-prime-a520m-k-amd-ryzen-ddr4-am4-90mb1500-m0eay0.jpg'),(7,'MEMORIA RAM CORSAIR VENGEANCE 64GB (2X32) DDR5 6000MHZ RGB (CMH64GX5M2B6000C30W)','Marca : Corsair, Modelo : Vengeance, Producto : Memoria RAM, Capacidad :64GB (2 x 32gb), Interfaz de memoria : DDR5, Velocidad del Bus : 6000 MHZ, Iluminación: RGB, SKUP: MEM-13',359,25,5,6,'https://www.infotec.com.pe/95452-large_default/memoria-ram-corsair-vengeance-64gb-2x32-ddr5-6000mhz-rgb-cmh64gx5m2b6000c30w.jpg'),(23,'ria','memo',18,10,2,5,'https://cgs-computer.pe/public_html/public/img/productos/J37BWmocfBAIZTLFzrBi1sdlV45ET9D7aKVY3zTdlgjvS4Htdmf6GIJBpmKd52XOMtnHvXwtFfrtHgfI.jpg');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `rol` varchar(10) DEFAULT 'cliente',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (16,'rene','garcia','reneee@gmail.com','$2b$10$PJhHni2f3lROTpM2HIjg1.qpOFFfpZGosvPWQKhPCOm6LkQ5WnKiW',920049366,'asd','cliente'),(17,'Eduardo','Leon','eduardo@gmail.com','$2b$10$FKHCwQa9rlMgOUOli5eoJewTZnal2PT9Wb.zCy8dVDu/QaPorEw8O',1010,'asd','admin');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-19 10:40:00
