import connection from '../database/connection';
import { Request, Response } from 'express';
import { generateUniqueCod } from '../utils/generateUniqueCod';

async function index(req: Request, res: Response) {
  const { cod } = req.params;

  if (cod) {
    const product = await connection('products').where('cod', cod).select("*").first();

    if (!product || product.deleted) {
      return res.status(400).json({ error: "Produto não encontrado" });
    }

    return res.status(200).json(product);
  }

  const products = await connection('products').where('deleted', false).select("*");

  return res.json(products);
}

async function create(req: Request, res: Response) {
  const { name, description, discount, price, amount, weight, unitOfMeasurement } = req.body;

  const cod = generateUniqueCod();

  const result = await connection('products').insert({
    cod, name, description, discount, price, amount, weight, unitOfMeasurement, createdAt: new Date()
  });

  if (result) {
    return res.status(200).json({ cod });
  }

  return res.status(400).json({ error: "Não foi possível cadastrar o produto" });
}

async function edit(req: Request, res: Response) {
  const { cod } = req.params;
  const { name, description, discount, price, amount, weight, unitOfMeasurement } = req.body;

  const products = await connection('products')
    .where('cod', cod)
    .first();

  if (products === undefined || products.length === 0) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  await connection('products').where('cod', cod).update({
    name, description, discount, price, amount, weight, unitOfMeasurement, updatedAt: new Date()
  });

  return res.status(204).send();
}

async function del(req: Request, res: Response) {
  const { cod } = req.params;

  const products = await connection('products')
    .where('cod', cod)
    .first();

  if (products === undefined || products.length === 0) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  await connection('products').where('cod', cod).update({ deleted: true });

  return res.status(204).send();
}

export default {
  index,
  create,
  edit,
  del
};