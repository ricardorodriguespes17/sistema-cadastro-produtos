import express from 'express';
import ProductController from './controller/ProductController';

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Bem-vindo ao servidor");
});

app.get("/products", ProductController.index);
app.get("/products/:cod", ProductController.index);
app.post('/products', ProductController.create);
app.put('/products/:cod', ProductController.edit);
app.delete('/products/:cod', ProductController.del);

export default app;