import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import CheckoutModel from "./checkout.model";

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
          id: product.id.id,
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
          purchasePrice: product.salesPrice ?? 0,
          stock: product.stock ?? 0,
          checkoutId: order.id.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      },
      { include: [CheckoutModel.associations.items] }
    );
  }
}
