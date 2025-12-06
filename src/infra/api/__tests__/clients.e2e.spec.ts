import request from "supertest";
import { app } from "../server";
import { sequelize } from "../../db/sequelize";
import Address from "../../../modules/@shared/domain/value-object/address";

describe("E2E Clients", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const response = await request(app).post("/clients").send({
      id: "1",
      name: "Lucian",
      email: "lucian@xpto.com",
      document: "1234-5678",
      street: "Rua 123",
      number: "99",
      complement: "Casa Verde",
      city: "Criciúma",
      state: "SC",
      zipCode: "88888-888",
    });

    expect(response.status).toBe(201);
    expect(response.body.id).toBe("1");
    expect(response.body.name).toBe("Lucian");
    expect(response.body.email).toBe("lucian@xpto.com");
    expect(response.body.document).toBe("1234-5678");
    expect(response.body.address.street).toBe("Rua 123");
    expect(response.body.address.number).toBe("99");
    expect(response.body.address.complement).toBe("Casa Verde");
    expect(response.body.address.city).toBe("Criciúma");
    expect(response.body.address.state).toBe("SC");
    expect(response.body.address.zipCode).toBe("88888-888");
  });
});
