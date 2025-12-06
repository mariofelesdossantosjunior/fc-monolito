import { Sequelize } from "sequelize-typescript";
import CheckoutRepository from "./checkout.repository";
import CheckoutModel from "./checkout.model";
import { ProductModel } from "../../product-adm/repository/product.model";
import { ClientModel } from "../../client-adm/repository/client.model";
import Order from "../domain/order.entity";
import Client from "../domain/client.entity";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";

describe("CheckoutRepository addOrder test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CheckoutModel, ProductModel, ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should save a checkout with products", async () => {
    const address = new Address(
      "Street 1",
      "123",
      "Complement",
      "City",
      "State",
      "12345-678"
    );

    const client = new Client({
      id: new Id("client-1"),
      name: "John Doe",
      email: "john@test.com",
      address: address,
    });

    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: "12345678900",
      street: client.address.street,
      number: client.address.number,
      zipcode: client.address.zipCode,
      state: client.address.state,
      city: client.address.city,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const product1 = new Product({
      id: new Id("p1"),
      name: "Product 1",
      description: "desc",
      salesPrice: 10,
      stock: 100,
    });

    const product2 = new Product({
      id: new Id("p2"),
      name: "Product 2",
      description: "desc",
      salesPrice: 20,
      stock: 50,
    });

    const order = new Order({
      id: new Id("checkout-1"),
      client,
      products: [product1, product2],
      status: "pending",
    });

    const repository = new CheckoutRepository();

    // Act
    await repository.addOrder(order);

    // Assert
    const checkoutDb = await CheckoutModel.findOne({
      where: { id: "checkout-1" },
      include: [ProductModel],
    });

    expect(checkoutDb).not.toBeNull();
    expect(checkoutDb!.status).toBe("pending");
    expect(checkoutDb!.clientId).toBe("client-1");

    expect(checkoutDb!.items.length).toBe(2);

    const item1 = checkoutDb!.items.find((i) => i.id === "p1");
    const item2 = checkoutDb!.items.find((i) => i.id === "p2");

    expect(item1!.name).toBe("Product 1");
    expect(item2!.name).toBe("Product 2");
  });
});
