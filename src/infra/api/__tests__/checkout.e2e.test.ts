import request from "supertest";
import { app } from "../server";
import { sequelize } from "../../db/sequelize";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../../modules/product-adm/repository/product.model";
import CheckoutModel from "../../../modules/checkout/repository/checkout.model";

describe("E2E test for checkout", () => {
  beforeAll(async () => {
    sequelize.addModels([ClientModel, ProductModel, CheckoutModel]);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create checkout", async () => {
    await request(app).post("/clients").send({
      id: "1",
      name: "Client 1",
      email: "client1@test.com",
      document: "123456789",
      street: "Street 1",
      number: "123",
      complement: "Apt 1",
      city: "City 1",
      state: "ST",
      zipcode: "00000-000",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await request(app).post("/products").send({
      id: "1",
      name: "Product 1",
      description: "Desc 1",
      purchasePrice: 10,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await request(app).post("/products").send({
      id: "2",
      name: "Product 2",
      description: "Desc 2",
      purchasePrice: 20,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Criação do checkout
    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "1",
        products: [{ productId: "1" }, { productId: "2" }],
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.total).toBe(30);
    expect(response.body.products.length).toBe(2);
  });
});
