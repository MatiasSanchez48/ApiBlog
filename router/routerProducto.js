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
import {
  authMiddleWare,
  validationMiddleWare,
} from "../middleware/middleware.js";
import {
  validationNameOrSurname,
  validationPrice,
} from "../validations/validations.js";

export const routerProducto = express.Router();

routerProducto.get("/", brotlimiddleware, getProductosController);
routerProducto.get(
  "/paginado",
  brotlimiddleware,
  getProductosPaginadoController
);
routerProducto.get(
  "/filtrado",
  brotlimiddleware,
  getProductosFiltradosController
);

routerProducto.get("/:id", getProductoController);

//Validaciones al crear un producto
routerProducto.post(
  "/",
  // [validationNameOrSurname("nombre"), validationPrice],
  // authMiddleWare,
  postProductoController
);

routerProducto.put("/:id", authMiddleWare, putProductoController);

routerProducto.delete("/:id", authMiddleWare, deleteProductoController);

routerProducto.delete(
  "/definitivo/:id",
  authMiddleWare,
  deleteDefinitivoController
);
