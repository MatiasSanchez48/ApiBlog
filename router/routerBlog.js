import express from "express";
import {
  getBlogsController,
  getBlogController,
  getBlogPopuladoController,
  postBlogController,
  putBlogController,
  deleteBlogController,
  getBlogsIDAutorController,
} from "../controller/controllerBlog.js";
import { authMiddleWare } from "../middleware/authMiddleWare.js";
import { handleValidationErrors } from "../middleware/validationMiddleWare.js";
import {
  getBlogValidation,
  deleteBlogValidation,
  postBlogValidation,
  putBlogValidation,
} from "../validations/validationsBlog.js";

export const routerBlog = express.Router();

routerBlog.get("/", getBlogsController);

routerBlog.get("/populado/:id", getBlogPopuladoController);

routerBlog.get(
  "/:id",
  getBlogValidation,
  handleValidationErrors,
  getBlogController
);
routerBlog.get(
  "/getbyautor/:id",
  getBlogValidation,
  handleValidationErrors,
  getBlogsIDAutorController
);
routerBlog.post(
  "/",
  postBlogValidation,
  handleValidationErrors,
  authMiddleWare,
  postBlogController
);

routerBlog.put(
  "/:id",
  putBlogValidation,
  handleValidationErrors,
  authMiddleWare,
  putBlogController
);

routerBlog.delete(
  "/:id",
  deleteBlogValidation,
  handleValidationErrors,
  authMiddleWare,
  deleteBlogController
);
