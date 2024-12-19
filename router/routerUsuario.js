import express from "express";
import {
  postLoginUserController,
  postRegisterUserController,
  postRefreshUserController,
} from "../controller/controllerUsuario.js";
import { handleValidationErrors } from "../middleware/validationMiddleWare.js";
import {
  postLoginValidation,
  postRefreshTokenValidation,
  postRegisterValidation,
} from "../validations/validationsUsuario.js";

export const routerUsuario = express.Router();

routerUsuario.post(
  "/login",
  postLoginValidation,
  handleValidationErrors,
  postLoginUserController
);

routerUsuario.post(
  "/register",
  postRegisterValidation,
  handleValidationErrors,
  postRegisterUserController
);

routerUsuario.post(
  "/token",
  postRefreshTokenValidation,
  handleValidationErrors,
  postRefreshUserController
);
