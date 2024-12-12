import express from "express";
import {
  getBlogsController,
  getBlogController,
  getBlogPopuladoController,
  postBlogController,
  putBlogController,
  deleteBlogController,
} from "../controller/controllerBlog.js";
import { authMiddleware } from "../middleware/authMiddleWare.js";

export const routerBlog = express.Router();

routerBlog.get("/", getBlogsController);

routerBlog.get("/populado/:id", getBlogPopuladoController);
routerBlog.get("/:id", getBlogController);

routerBlog.post("/", authMiddleware, postBlogController);

routerBlog.put("/:id", authMiddleware, putBlogController);

routerBlog.delete("/:id", authMiddleware, deleteBlogController);
