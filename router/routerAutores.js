import express from "express";

import {
  getAutoresController,
  postAutorController,
  getAutorController,
  putAutorController,
  deleteAutorController,
} from "../controller/controllerAutores.js";
import { authMiddleWare } from "../middleware/authMiddleWare.js";
import {
  deleteAutorValidation,
  getAutorValidation,
  postAutorValidation,
  putAutorValidation,
} from "../validations/validationsAutor.js";
import { handleValidationErrors } from "../middleware/validationMiddleWare.js";

export const routerAutores = express.Router();

routerAutores.get("/", getAutoresController);

routerAutores.get(
  "/:id",
  getAutorValidation,
  handleValidationErrors,
  authMiddleWare,
  getAutorController
);

routerAutores.post(
  "/",
  postAutorValidation,
  handleValidationErrors,
  authMiddleWare,
  postAutorController
);

routerAutores.put(
  "/:id",
  putAutorValidation,
  handleValidationErrors,
  authMiddleWare,
  putAutorController
);

routerAutores.delete(
  "/:id",
  deleteAutorValidation,
  handleValidationErrors,
  authMiddleWare,
  deleteAutorController
);
