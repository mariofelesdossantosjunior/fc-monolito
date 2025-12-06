import { Request, Response } from "express";
import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";

export async function getInvoice(req: Request, res: Response) {
  const invoiceFacade = InvoiceFacadeFactory.create();

  try {
    const invoice = await invoiceFacade.find({
      id: req.params.id,
    });

    return res.status(201).json(invoice);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createInvoice(req: Request, res: Response) {
  const invoiceFacade = InvoiceFacadeFactory.create();

  try {
    const invoice = await invoiceFacade.generate({
      name: req.body.name,
      document: req.body.document,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      items: req.body.items,
    });

    return res.status(201).json(invoice);
  } catch (error) {
    res.status(500).send(error);
  }
}
