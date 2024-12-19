import express from "express";

import {
  getProductoController,
  postProductoController,
  getProductosController,
  putProductoController,
  deleteDefinitivoController,
  deleteProductoController,
  getProductosPaginadoController,
  getProductosFiltradosController,
} from "../controller/controller.js";

import { brotlimiddleware } from "../middleware/brotlimiddleware.js";
import { authMiddleWare } from "../middleware/middleware.js";
import {
  deleteProductoValidation,
  getProductoValidation,
  postProductoValidation,
  putProductoValidation,
  getProductosPaginadosValidation,
  getProductosFiltradosValidation,
} from "../validations/validationsProducto.js";
import { handleValidationErrors } from "../middleware/validationMiddleWare.js";

export const routerProducto = express.Router();

routerProducto.get("/", brotlimiddleware, getProductosController);
routerProducto.get(
  "/paginado",
  getProductosPaginadosValidation,
  handleValidationErrors,
  brotlimiddleware,
  getProductosPaginadoController
);

routerProducto.get(
  "/filtrado",
  getProductosFiltradosValidation,
  handleValidationErrors,
  brotlimiddleware,
  getProductosFiltradosController
);

routerProducto.get(
  "/:id",
  getProductoValidation,
  handleValidationErrors,
  getProductoController
);

routerProducto.post(
  "/",
  postProductoValidation,
  handleValidationErrors,
  authMiddleWare,
  postProductoController
);

routerProducto.put(
  "/:id",
  putProductoValidation,
  handleValidationErrors,
  authMiddleWare,
  putProductoController
);

routerProducto.delete(
  "/:id",
  deleteProductoValidation,
  handleValidationErrors,
  authMiddleWare,
  deleteProductoController
);

routerProducto.delete(
  "/definitivo/:id",
  deleteProductoValidation,
  handleValidationErrors,
  authMiddleWare,
  deleteDefinitivoController
);
