import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { ClientModel } from "../../client-adm/repository/client.model";
import CheckoutItemModel from "./checkout-item.model";

@Table({
  tableName: "checkout",
  timestamps: false,
})
export default class CheckoutModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  status: string;

  @ForeignKey(() => ClientModel)
  @Column({ allowNull: false })
  clientId: string;

  @BelongsTo(() => ClientModel)
  client: ClientModel;

  @HasMany(() => CheckoutItemModel, "checkout_id")
  items: CheckoutItemModel[];
}
