import request from "supertest";
import { app } from "../server";
import { sequelize } from "../../db/sequelize";
import InvoiceFacade from "../../../modules/invoice/facade/invoice.facade";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";

describe("E2E Invoice", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create and return an invoice", async () => {
    const input = {
      name: "Invoice 1",
      document: "12345678900",
      street: "Street 1",
      number: "123",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "12345678",
      items: [
        { id: "1", name: "Item 1", price: 10 },
        { id: "2", name: "Item 2", price: 20 },
      ],
    };

    const createResponse = await request(app).post("/invoice").send(input);
    expect(createResponse.status).toBe(201);
    const invoiceId = createResponse.body.id;

    const getResponse = await request(app).get(`/invoice/${invoiceId}`);
    expect(getResponse.status).toBe(201);

    expect(getResponse.body.id).toBe(invoiceId);
    expect(getResponse.body.name).toBe(input.name);
    expect(getResponse.body.document).toBe(input.document);
    expect(getResponse.body.address.street).toBe(input.street);
    expect(getResponse.body.address.number).toBe(input.number);
    expect(getResponse.body.address.complement).toBe(input.complement);
    expect(getResponse.body.address.city).toBe(input.city);
    expect(getResponse.body.address.state).toBe(input.state);
    expect(getResponse.body.address.zipCode).toBe(input.zipCode);
    expect(getResponse.body.items).toHaveLength(input.items.length);
  });
});
