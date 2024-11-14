import express from "express";
import {
  getBlogsController,
  getBlogController,
  postBlogController,
  putBlogController,
  deleteBlogController,
} from "../controller/controllerBlog.js";

const routerBlog = express.Router();

routerBlog.get("/", getBlogsController);

routerBlog.get("/:id", getBlogController);

routerBlog.post("/", postBlogController);

routerBlog.put("/:id", putBlogController);

routerBlog.delete("/:id", deleteBlogController);

export default routerBlog;
