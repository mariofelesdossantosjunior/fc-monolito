import request from "supertest";
import { app } from "../server";
import { sequelize } from "../../db/sequelize";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../../modules/product-adm/repository/product.model";
import CheckoutModel from "../../../modules/checkout/repository/checkout.model";
import CheckoutItemModel from "../../../modules/checkout/repository/checkout-item.model";

describe("E2E test for products", () => {
  beforeEach(async () => {
    sequelize.addModels([
      ClientModel,
      ProductModel,
      CheckoutModel,
      CheckoutItemModel,
    ]);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new product", async () => {
    const res = await request(app).post("/products").send({
      id: "1",
      name: "Notebook",
      description: "Notebook Dell",
      purchasePrice: 2500,
      stock: 50,
    });

    expect(res.status).toBe(201);
    expect(res.body.id).toBe("1");
    expect(res.body.name).toBe("Notebook");
    expect(res.body.description).toBe("Notebook Dell");
    expect(res.body.purchasePrice).toBe(2500);
    expect(res.body.stock).toBe(50);
  });
});
