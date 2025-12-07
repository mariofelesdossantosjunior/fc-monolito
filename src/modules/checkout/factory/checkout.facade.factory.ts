import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import CheckoutFacade from "../facade/checkout.facade";
import CheckoutRepository from "../repository/checkout.repository";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";

export default class CheckoutFacadeFactory {
  static create() {
    const clientFacade = ClientAdmFacadeFactory.create();
    const productFacade = ProductAdmFacadeFactory.create();
    const storeCatalogFacade = StoreCatalogFacadeFactory.create();
    const checkoutRepository = new CheckoutRepository();
    const placeOrderUsecase = new PlaceOrderUseCase(
      clientFacade,
      productFacade,
      storeCatalogFacade,
      checkoutRepository
    );

    const facade = new CheckoutFacade({
      placeOrderUseCase: placeOrderUsecase,
    });

    return facade;
  }
}
