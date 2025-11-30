import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
} from "./find-invoice.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(
    input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    const persistInvoice = await this.invoiceRepository.find(input.id);

    return {
      id: persistInvoice.id.id,
      name: persistInvoice.name,
      document: persistInvoice.document,
      address: {
        street: persistInvoice.address.street,
        number: persistInvoice.address.number,
        complement: persistInvoice.address.complement,
        city: persistInvoice.address.city,
        state: persistInvoice.address.state,
        zipCode: persistInvoice.address.zipCode,
      },
      items: persistInvoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: persistInvoice.total,
      createdAt: persistInvoice.createdAt,
    };
  }
}
