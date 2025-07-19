const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // el express que exportaste
const expect = chai.expect;

chai.use(chaiHttp);

describe('🧪 API de productos', () => {

  it('GET /api/productos debería devolver un array de productos', (done) => {
    chai.request(app)
      .get('/api/productos')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('POST /api/productos debería crear un nuevo producto', (done) => {
    chai.request(app)
      .post('/api/productos')
      .send({
        nombre: 'Mouse Gamer',
        descripcion: 'Mouse con luces RGB',
        precio: 99.90,
        stock: 5,
        id_categoria: 1,
        id_marca: 1,
        imagen: 'https://ejemplo.com/mouse.jpg'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        expect(res.body.nombre).to.equal('Mouse Gamer');
        done();
      });
  });

  it('GET /api/productos/:id debería devolver un producto si existe', (done) => {
    chai.request(app)
      .get('/api/productos/1') // Asegúrate de tener el ID 1 en tu BD
      .end((err, res) => {
        if (res.status === 404) {
          console.log('⚠️ Producto con ID 1 no existe. Prueba manual.');
          return done();
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id_producto');
        done();
      });
  });

});
