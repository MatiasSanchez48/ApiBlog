import express from "express";

import {
  getProductoController,
  postProductoController,
  getProductosController,
  putProductoController,
  deleteDefinitivoController,
  deleteProductoController,
} from "../controller/controller.js";

export const routerProducto = express.Router();

routerProducto.get("/", getProductosController);

routerProducto.get("/:id", getProductoController);

routerProducto.post("/", postProductoController);

routerProducto.put("/:id", putProductoController);

routerProducto.delete("/:id", deleteProductoController);

routerProducto.delete("/definitivo/:id", deleteDefinitivoController);
