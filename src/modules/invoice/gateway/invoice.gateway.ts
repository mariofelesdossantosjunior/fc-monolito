import Invoice from "../domain/Invoice";

export default interface InvoiceGateway {
  generate(input: Invoice): Promise<void>;
  find(input: string): Promise<Invoice>;
}
