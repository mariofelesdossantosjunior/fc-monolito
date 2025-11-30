import { Sequelize } from "sequelize-typescript";
import Address from "../../@shared/domain/value-object/address";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("Invoice Facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate and find a invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

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

    const invoiceGenerated = await facade.generate(input);

    const invoice = await InvoiceModel.findOne({
      where: { id: invoiceGenerated.id },
    });

    expect(invoice).toBeDefined();
    expect(invoice.id).toBe(invoiceGenerated.id);
    expect(invoice.name).toBe(input.name);
    expect(invoice.document).toBe(input.document);
    expect(invoice.street).toBe(input.street);
    expect(invoice.number).toBe(input.number);
    expect(invoice.complement).toBe(input.complement);
    expect(invoice.city).toBe(input.city);
    expect(invoice.state).toBe(input.state);
    expect(invoice.zipcode).toBe(input.zipCode);
  });
});
