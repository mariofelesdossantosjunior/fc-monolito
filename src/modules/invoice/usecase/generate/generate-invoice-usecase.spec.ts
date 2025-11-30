import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/Invoice";
import InvoiceItems from "../../domain/InvoiceItems";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const invoice = new Invoice({
  name: "Invoice 1",
  document: "12345678900",
  address: new Address(
    "Street 1",
    "123",
    "Complement 1",
    "City 1",
    "State 1",
    "12345678"
  ),
  items: [
    new InvoiceItems({ id: new Id("1"), name: "Item 1", price: 10 }),
    new InvoiceItems({ id: new Id("2"), name: "Item 2", price: 20 }),
  ],
});

const MockRepository = () => ({
  generate: jest.fn().mockResolvedValue(invoice),
  find: jest.fn(),
});

describe("Generate invoice usecase unit test", () => {
  it("should generate invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(invoiceRepository);

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

    const result = await usecase.execute(input);

    expect(invoiceRepository.generate).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.street).toBe(invoice.address.street);
    expect(result.number).toBe(invoice.address.number);
    expect(result.complement).toBe(invoice.address.complement);
    expect(result.city).toBe(invoice.address.city);
    expect(result.state).toBe(invoice.address.state);
    expect(result.zipCode).toBe(invoice.address.zipCode);
    expect(result.items.length).toBe(2);
    expect(result.total).toBe(30);
  });
});
