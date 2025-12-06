import { Request, Response } from "express";
import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";
import PlaceOrderUseCase from "../../../modules/checkout/usecase/place-order/place-order.usecase";
import CheckoutRepository from "../../../modules/checkout/repository/checkout.repository";

export async function checkout(req: Request, res: Response) {
  const clientFacade = ClientAdmFacadeFactory.create();
  const productFacade = ProductAdmFacadeFactory.create();
  const storeCatalogFacade = StoreCatalogFacadeFactory.create();
  const checkoutRepository = new CheckoutRepository();

  const placeOrderUseCase = new PlaceOrderUseCase(
    clientFacade,
    productFacade,
    storeCatalogFacade,
    checkoutRepository
  );

  try {
    const order = placeOrderUseCase.execute({
      clientId: req.body.clientId,
      products: req.body.products,
    });

    return res.status(201).json(order);
  } catch (error) {
    res.status(500).send(error);
  }
}
