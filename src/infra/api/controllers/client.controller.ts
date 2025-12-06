import { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import Address from "../../../modules/@shared/domain/value-object/address";

export async function createClient(req: Request, res: Response) {
  const clientFacade = ClientAdmFacadeFactory.create();

  try {
    const address = new Address(
      req.body.street,
      req.body.number,
      req.body.complement,
      req.body.city,
      req.body.state,
      req.body.zipCode
    );

    const client = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      address: address,
    };

    await clientFacade.add(client);

    return res.status(201).json({
      id: client.id,
      name: client.name,
      email: client.email,
      document: client.document,
      address: {
        street: client.address.street,
        number: client.address.number,
        complement: client.address.complement,
        city: client.address.city,
        state: client.address.state,
        zipCode: client.address.zipCode,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
