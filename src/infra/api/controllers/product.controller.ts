import { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";

export async function createProduct(req: Request, res: Response) {
  const productFacade = ProductAdmFacadeFactory.create();

  try {
    const product = await productFacade.addProduct({
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    });
    return res.status(201).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
}
