import PlaceOrderUseCase from "./place-order.usecase";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacade from "../../../store-catalog/facade/store-catalog.facade";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto } from "./place-order.dto";
import Address from "../../../@shared/domain/value-object/address";

describe("PlaceOrderUseCase Unit Tests", () => {
  let usecase: PlaceOrderUseCase;
  let clientFacade: ClientAdmFacadeInterface;
  let productFacade: ProductAdmFacadeInterface;
  let catalogFacade: StoreCatalogFacade;
  let repository: CheckoutGateway;

  beforeEach(() => {
    clientFacade = {
      find: jest.fn(),
    } as any;

    productFacade = {
      checkStock: jest.fn(),
    } as any;

    catalogFacade = {
      find: jest.fn(),
    } as any;

    repository = {
      addOrder: jest.fn(),
    } as any;

    usecase = new PlaceOrderUseCase(
      clientFacade,
      productFacade,
      catalogFacade,
      repository
    );
  });

  it("should place an order successfully", async () => {
    const input: PlaceOrderInputDto = {
      clientId: "c1",
      products: [{ productId: "p1" }, { productId: "p2" }],
    };

    (clientFacade.find as jest.Mock).mockResolvedValue({
      id: "c1",
      name: "Client 1",
      email: "client1@test.com",
      address: {
        street: "Street",
        number: "123",
        complement: "Apt 1",
        city: "City",
        state: "ST",
        zipCode: "00000-000",
      },
    });

    (productFacade.checkStock as jest.Mock).mockImplementation(
      ({ productId }) => ({
        productId,
        stock: 10,
      })
    );

    (catalogFacade.find as jest.Mock).mockImplementation(({ id }) => ({
      id,
      name: `Product ${id}`,
      description: `Description ${id}`,
      salesPrice: 100,
    }));

    const output = await usecase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.total).toBe(200);
    expect(output.products).toHaveLength(2);
    expect(repository.addOrder).toHaveBeenCalled();
  });

  it("should throw error if client not found", async () => {
    (clientFacade.find as jest.Mock).mockResolvedValue(null);

    await expect(
      usecase.execute({ clientId: "c1", products: [{ productId: "p1" }] })
    ).rejects.toThrow("Client not found");
  });

  it("should throw error if no products selected", async () => {
    (clientFacade.find as jest.Mock).mockResolvedValue({
      id: "c1",
      name: "Client 1",
      email: "client1@test.com",
      address: {
        street: "Street",
        number: "123",
        complement: "Apt 1",
        city: "City",
        state: "ST",
        zipCode: "00000-000",
      },
    });

    await expect(
      usecase.execute({ clientId: "c1", products: [] })
    ).rejects.toThrow("No products selected");
  });

  it("should throw error if a product is out of stock", async () => {
    (clientFacade.find as jest.Mock).mockResolvedValue({
      id: "c1",
      name: "Client 1",
      email: "client1@test.com",
      address: {
        street: "Street",
        number: "123",
        complement: "Apt 1",
        city: "City",
        state: "ST",
        zipCode: "00000-000",
      },
    });

    (productFacade.checkStock as jest.Mock).mockImplementation(
      ({ productId }) => ({
        productId,
        stock: 0,
      })
    );

    await expect(
      usecase.execute({ clientId: "c1", products: [{ productId: "p1" }] })
    ).rejects.toThrow("Product p1 is not available in stock");
  });
});
