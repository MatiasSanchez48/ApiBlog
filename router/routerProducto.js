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
import { body } from "express-validator";

import { brotlimiddleware } from "../middleware/brotlimiddleware.js";
import { authMiddleware } from "../middleware/authMiddleWare.js";

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
  [
    body("nombre")
      .isString()
      .withMessage("faltan datos.")
      .isLength({ min: 1, max: 100 })
      .withMessage("el nombre debe tener entre 1 y 100 caracteres."),
    body("precio")
      .isNumeric()
      .withMessage("faltan datos.")
      .isLength({ min: 1 }),
  ], //Despues sallent los errores del req
  authMiddleware,
  postProductoController
);

routerProducto.put("/:id", authMiddleware, putProductoController);

routerProducto.delete("/:id", authMiddleware, deleteProductoController);

routerProducto.delete(
  "/definitivo/:id",
  authMiddleware,
  deleteDefinitivoController
);
