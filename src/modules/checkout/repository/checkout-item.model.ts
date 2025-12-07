import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { ProductModel } from "../../product-adm/repository/product.model";
import CheckoutModel from "./checkout.model";

@Table({
  tableName: "checkout-item",
  timestamps: false,
})
export default class CheckoutItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => CheckoutModel)
  @Column({ allowNull: false, field: "checkout_id" })
  checkoutId: string;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false, field: "product_id" })
  productId: string;

  @BelongsTo(() => CheckoutModel, "checkout_id")
  checkout: CheckoutModel;

  @BelongsTo(() => ProductModel, "product_id")
  product: ProductModel;
}
