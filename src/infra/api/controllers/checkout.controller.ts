import { Request, Response } from "express";
import CheckoutFacadeFactory from "../../../modules/checkout/factory/checkout.facade.factory";

export async function checkout(req: Request, res: Response) {
  const checkoutFacade = CheckoutFacadeFactory.create();

  try {
    const order = await checkoutFacade.checkout({
      clientId: req.body.clientId,
      products: req.body.products.map((p: any) => ({
        productId: p.productId,
        quantity: p.quantity ?? 1,
      })),
    });

    return res.status(201).json(order);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
