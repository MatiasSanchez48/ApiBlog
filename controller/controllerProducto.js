import { validationResult } from "express-validator";
import {
  getProductosService,
  getProductoService,
  postProductoService,
  putProductoService,
  deleteDefinitivoService,
  deleteProductoService,
  getProductosPaginadosService,
  getProductosFiltradosService,
} from "../services/services.js";

/**
 * Controller de productos.
 * @module controllers/controllerProducto
 */

/**
 * - Obtiene todos los productos.
 * Obtiene la lista de todos los productos.
 *
 * @return una respuesta JSON con todos los productos.
 */
export const getProductosController = async (req, res) => {
  try {
    const productos = await getProductosService();
    res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProductosPaginadoController = async (req, res) => {
  try {
    const { page = 1, limit = 2 } = req.query;

    const productos = await getProductosPaginadosService(page, limit);
    res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProductosFiltradosController = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 2,
      nombre,
      precioMin,
      precioMax,
      orderBy,
      order,
    } = req.query;

    const productos = await getProductosFiltradosService(
      page,
      limit,
      nombre,
      precioMin,
      precioMax,
      orderBy,
      order
    );
    console.log(productos);
    res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/**
 * - Obtiene un producto.
 * Obtiene el producto que coincida con el id de todos los productos.
 *
 * @return una respuesta JSON del producto.
 */
export const getProductoController = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await getProductoService(id);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/**
 * - Crea un nuevo producto.
 * Obtiene los parametros pora crear el producto nuevo
 * y lo agrega a la lista de productos como uno nuevo.
 *
 * @return una respuesta JSON del producto creado.
 */
export const postProductoController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty() || !req.body) {
      return res.status(400).json({
        status: "error",
        message: "faltan datos",
        error: errors.array(),
      });
    }
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
      return res.status(400).json({ error: "faltan datos. " + error.message });
    }
    const producto = await postProductoService({ nombre, precio });
    res.status(200).json({ mensaje: "producto creado", producto: producto });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/**
 * - Edita un producto existente.
 * Obtiene los parametros pora Editar/Modificar el producto
 * y lo Edita/Modifica de la lista de productos.
 *
 * @return una respuesta JSON del producto editado/modificado.
 */
export const putProductoController = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, precio } = req.body;
    const producto = await putProductoService(id, nombre, precio);
    res.status(200).json({ mensaje: "producto editado", producto: producto });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * - Elimina un producto existente.
 * Borra el producto que coincida con el id.
 *
 * @return una respuesta JSON del producto eliminado.
 */
export const deleteProductoController = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await deleteProductoService(id);
    res.status(200).json({ mensaje: "producto eliminado", producto: producto });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * - Elimina definitivamente un producto existente.
 * Borra definitivamente el producto que coincida con el id.
 *
 * @return una respuesta JSON del producto eliminado definitivamente.
 */
export const deleteDefinitivoController = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await deleteDefinitivoService(id);
    return res
      .status(200)
      .json({ mensaje: "producto eliminado definitivamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
