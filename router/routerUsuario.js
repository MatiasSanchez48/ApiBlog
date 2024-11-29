import express from "express";
import {
  postLoginUserController,
  postRegisterUserController,
  postRefreshUserController,
} from "../controller/controllerUsuario.js";

export const routerUsuario = express.Router();

routerUsuario.post("/login", postLoginUserController);
routerUsuario.post("/register", postRegisterUserController);
routerUsuario.post("/token", postRefreshUserController);
