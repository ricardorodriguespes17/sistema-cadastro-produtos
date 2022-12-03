import connection from "../../src/database/connection";
import request from 'supertest';
import app from '../../src/app';

const c = connection as any;

describe('Testes de produtos', () => {
  beforeEach(async () => {
    await c.migrate.rollback();
    await c.migrate.latest();
  });

  afterAll(async () => {
    await c.destroy();
  });

  it('teste de busca de lista de produtos', async () => {
    const response = await request(app).get('/products');

    expect(response.body).toBeDefined();
    expect(response.statusCode).toBe(200);
  });

  it('teste de busca um produto', async () => {
    const { cod } = (await createProduct()).body;
    const response = await request(app).get(`/products/${cod}`);

    expect(response.body).toBeDefined();
    expect(response.statusCode).toBe(200);
  });

  it('teste de criação de produto', async () => {
    const response = await createProduct();

    expect(response.body).toHaveProperty("cod");
    expect(response.statusCode).toBe(200);
  });

  it('teste de edição de um produto', async () => {
    const { cod } = (await createProduct()).body;

    const response = await request(app)
      .put(`/products/${cod}`)
      .send({
        name: "Arroz",
        description: "Parbolizado",
        discount: 0.1,
        price: 5,
        amount: 10,
        weight: 1,
        unitOfMeasurement: "kg"
      });

    expect(response.statusCode).toBe(204);
  });

  it('teste de exclusão de um produto', async () => {
    const { cod } = (await createProduct()).body;

    const response = await request(app).delete(`/products/${cod}`);

    expect(response.statusCode).toBe(204);
  });
});

async function createProduct() {
  const response = await request(app)
    .post('/products')
    .send({
      name: "Arroz",
      description: "Branco",
      discount: 0.1,
      price: 5,
      amount: 10,
      weight: 1,
      unitOfMeasurement: "kg"
    });

  return response;
}