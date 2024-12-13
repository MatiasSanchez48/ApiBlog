import {
  getProductoService,
  postProductoService,
  getProductosService,
  putProductoService,
  deleteDefinitivoService,
  deleteProductoService,
  getProductosFiltradosService,
  getProductosPaginadosService,
} from "./serviceProducto.js";

import {
  getAutoresService,
  getAutorService,
  postAutorService,
  putAutorService,
  deleteAutorService,
} from "./serviceAutor.js";

import {
  getBlogsService,
  getBlogService,
  postBlogService,
  putBlogService,
  deleteBlogService,
} from "./serviceBlog.js";

import { RegisterUser, LoginUser, RefreshToken } from "./serviceUsuario.js";

export {
  //products
  getProductoService,
  postProductoService,
  getProductosService,
  putProductoService,
  deleteDefinitivoService,
  deleteProductoService,
  getProductosFiltradosService,
  getProductosPaginadosService,
  //author
  getAutoresService,
  getAutorService,
  postAutorService,
  putAutorService,
  deleteAutorService,
  //blog
  getBlogsService,
  getBlogService,
  postBlogService,
  putBlogService,
  deleteBlogService,
  //users
  RegisterUser,
  LoginUser,
  RefreshToken,
};
