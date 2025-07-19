const cron = require('node-cron');
const fs = require('fs');
const { exec } = require('child_process');
const mysql = require('mysql2');

// Conexión a tu base de datos MySQL
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'compumarket'
});

// 🕑 1. Hacer backup cada 2 minutos
cron.schedule('*/2 * * * *', () => {
  const fecha = new Date().toISOString().replace(/[:.]/g, '-');
  const nombreArchivo = `backup-${fecha}.sql`;
  const comando = `"C:/xampp/mysql/bin/mysqldump.exe" -u root -proot compumarket > backups/${nombreArchivo}`;

  exec(comando, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error haciendo backup:', error);
    } else {
      console.log(`✅ Backup guardado: backups/${nombreArchivo}`);
    }
  });
});


// 🧹 2. Limpieza de logs simulada
cron.schedule('*/2 * * * *', () => {
  const mensaje = `🧹 Limpieza ejecutada: ${new Date().toISOString()}\n`;
  fs.appendFileSync('log.txt', mensaje);
  console.log('✅ Limpieza de logs ejecutada');
});

// 🔥 3. Eliminar productos con stock en 0
cron.schedule('*/2 * * * *', () => {
  conexion.query('DELETE FROM producto WHERE stock = 0', (err, resultado) => {
    if (err) {
      console.error('❌ Error al eliminar productos con stock 0:', err);
    } else {
      console.log(`🗑️ Productos con stock 0 eliminados: ${resultado.affectedRows}`);
    }
  });
});

// 📦 4. Reporte de productos con poco stock
cron.schedule('*/2 * * * *', () => {
  conexion.query('SELECT nombre, stock FROM producto WHERE stock < 5', (err, resultados) => {
    if (err) {
      console.error('❌ Error al obtener productos con bajo stock:', err);
    } else {
      console.log('📦 Productos con stock bajo:');
      resultados.forEach(p => {
        console.log(`- ${p.nombre}: ${p.stock} unidades`);
      });
    }
  });
});
