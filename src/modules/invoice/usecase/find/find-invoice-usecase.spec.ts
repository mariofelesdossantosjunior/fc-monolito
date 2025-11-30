import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/Invoice";
import InvoiceItems from "../../domain/InvoiceItems";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
  id: new Id("1"),
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

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Find invoice usecase unit test", () => {
  it("should find invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new FindInvoiceUseCase(invoiceRepository);
    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(result.id).toBe(invoice.id.id);
    expect(invoiceRepository.find).toHaveBeenCalled();
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.zipCode).toBe(invoice.address.zipCode);
    expect(result.createdAt).toBe(invoice.createdAt);
    expect(result.items.length).toBe(2);
  });
});
