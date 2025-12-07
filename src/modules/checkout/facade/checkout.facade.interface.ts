export interface CheckoutFacadeInputDto {
  clientId: string;
  products: { productId: string }[];
}

export interface CheckoutFacadeOutputDto {
  id: string;
  total: number;
  products: {
    productId: string;
  }[];
}

export default interface CheckoutFacadeInterface {
  checkout(input: CheckoutFacadeInputDto): Promise<CheckoutFacadeOutputDto>;
}
