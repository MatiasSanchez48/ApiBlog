import express from "express";

import {
    getAutoresController,
    postAutorController,
    getAutorController,
    putAutorController,
    deleteAutorController
} from "../controller/controllerAutores.js";

export const routerAutores = express.Router();

routerBlog.get("/", getAutoresController);

routerBlog.get("/:id", getAutorController);

routerBlog.post("/", postAutorController);

routerBlog.put("/:id", putAutorController);

routerBlog.delete("/:id", deleteAutorController);
