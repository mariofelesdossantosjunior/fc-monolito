import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import CheckoutModel from "./checkout.model";
import CheckoutItemModel from "./checkout-item.model";
import Id from "../../@shared/domain/value-object/id.value-object";

export default class CheckoutRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    await CheckoutModel.create(
      {
        id: order.id.id,
        clientId: order.client.id.id,
        status: order.status,
        createdAt: new Date(),
        updatedAt: new Date(),
        items: order.products.map((product) => ({
          id: new Id().id,
          checkoutId: order.id.id,
          productId: product.id.id,
        })),
      },
      { include: [CheckoutModel.associations.items] }
    );
  }
}
