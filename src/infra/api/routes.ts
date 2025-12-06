import { Router } from "express";

import { createProduct } from "./controllers/product.controller";
import { createClient } from "./controllers/client.controller";
import { checkout } from "./controllers/checkout.controller";
import { createInvoice, getInvoice } from "./controllers/invoice.controller";

const routes = Router();

routes.post("/products", createProduct);
routes.post("/clients", createClient);
routes.post("/checkout", checkout);
routes.post("/invoice", createInvoice);
routes.get("/invoice/:id", getInvoice);

export default routes;
