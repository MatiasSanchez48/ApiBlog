import express from "express";

import {
    getAutoresController,
    postAutorController,
    getAutorController,
    putAutorController,
    deleteAutorController
} from "../controller/controllerAutores.js";

export const routerAutores = express.Router();

routerAutores.get("/", getAutoresController);

routerAutores.get("/:id", getAutorController);

routerAutores.post("/", postAutorController);

routerAutores.put("/:id", putAutorController);

routerAutores.delete("/:id", deleteAutorController);
