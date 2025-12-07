import { Sequelize } from "sequelize-typescript";
import { ProductModel as ProductAdmModel } from "../../modules/product-adm/repository/product.model";
import StoreCatalogProductModel from "../../modules/store-catalog/repository/product.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import { InvoiceItemModel } from "../../modules/invoice/repository/invoice-item.model";
import CheckoutModel from "../../modules/checkout/repository/checkout.model";
import CheckoutItemModel from "../../modules/checkout/repository/checkout-item.model";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
  models: [
    ClientModel,
    CheckoutModel,
    CheckoutItemModel,
    ProductAdmModel,
    StoreCatalogProductModel,
    InvoiceModel,
    InvoiceItemModel,
  ],
});

export async function initDb() {
  await sequelize.sync({ force: true });
}
