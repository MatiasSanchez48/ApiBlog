import express from "express";
import {
  getBlogsController,
  getBlogController,
  getBlogPopuladoController,
  postBlogController,
  putBlogController,
  deleteBlogController,
} from "../controller/controllerBlog.js";
import { authMiddleWare } from "../middleware/authMiddleWare.js";

export const routerBlog = express.Router();

routerBlog.get("/", getBlogsController);

routerBlog.get("/populado/:id", getBlogPopuladoController);

routerBlog.get("/:id", getBlogController);

routerBlog.post("/", authMiddleWare, postBlogController);

routerBlog.put("/:id", authMiddleWare, putBlogController);

routerBlog.delete("/:id", authMiddleWare, deleteBlogController);
