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

export const routerProducto = express.Router();

routerProducto.get("/", getProductosController);
routerProducto.get("/paginado", getProductosPaginadoController);
routerProducto.get("/filtrado", getProductosFiltradosController);

routerProducto.get("/:id", getProductoController);

routerProducto.post("/", postProductoController);

routerProducto.put("/:id", putProductoController);

routerProducto.delete("/:id", deleteProductoController);

routerProducto.delete("/definitivo/:id", deleteDefinitivoController);
