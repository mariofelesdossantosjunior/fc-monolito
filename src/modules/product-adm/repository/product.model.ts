import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import CheckoutItemModel from "../../checkout/repository/checkout-item.model";

@Table({
  tableName: "products",
  timestamps: true,
})
export class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: true })
  purchasePrice: number;

  @Column({ allowNull: true })
  salesPrice: number;

  @Column({ allowNull: false })
  stock: number;

  @HasMany(() => CheckoutItemModel, "product_id")
  items: CheckoutItemModel[];
}
