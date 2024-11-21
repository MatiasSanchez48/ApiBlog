import Producto from "../model/model.js";

let productos = [
  {
    id: 1,
    nombre: "producto1",
    precio: 100,
    estado: true,
  },
  {
    id: 2,
    nombre: "producto2",
    precio: 200,
    estado: true,
  },
  {
    id: 3,
    nombre: "producto3",
    precio: 300,
    estado: true,
  },
  {
    id: 4,
    nombre: "producto4",
    precio: 400,
    estado: true,
  },
];

/**
 * Controller de productos.
 * @module services/serviceProducto
 */

/**
 * - Obtiene todos los productos.
 * Obtiene la lista de todos los productos.
 *
 * @return una respuesta JSON con todos los productos.
 */
export const getProductosService = () => {
  return productos;
};

export const getProductosPaginadosService = (limit, page) => {
  //? el limit es la cantidad que quiero que devuelva por pagina.
  //? ===>
  //? el page es la pagina que quiero que devuelva.
  const skip = (page - 1) * limit;
  productos = productos.Find({ estado: true }).skip(skip).limit(limit);
  cantidad = productos.Find({ estado: true }).countDocuments();
  const respuesta = {
    productos: productos,
    cantidad: cantidad,
    cantidadActual: Math.ceil(cantidad / limit),
    paginaActual: page,
  };
  return respuesta;
};
export const getProductosFiltradosService = (
  limit,
  page,
  nombre,
  precioMin,
  precioMax,
  orderBy,
  order
) => {
  const filtros = { estado: true };
  if (nombre) {
    filtros.nombre = { $regex: nombre, $options: "i" };
  }

  if (precioMin || precioMax) {
    filtros.precio = {};
    if (precioMin) {
      filtros.precio = { $gte: precioMin };
    }
    if (precioMax) {
      filtros.precio = { $lte: precioMax };
    }
  }
  const sortOptions = {};
  if (orderBy) {
    sortOptions[orderBy] = order === "desc" ? -1 : 1;
  }
  const skip = (page - 1) * limit;
  const productos = productos
    .Find(filtros)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);
  const cantidad = productos.Find(filtros).countDocuments();
  const respuesta = {
    productos: productos,
    cantidad: cantidad,
    cantidadActual: Math.ceil(cantidad / limit),
    paginaActual: page,
  };
  return respuesta;
};
/**
 * - Obtiene un producto.
 * Obtiene el producto que coincida con el id de todos los productos.
 *
 * @return una respuesta JSON del producto.
 */
export const getProductoService = (id) => {
  const producto = productos.find((p) => p.id == id);
  if (!producto) {
    return res.status(404).json({ error: "producto no encontrado" });
  }
  return producto;
};

/**
 * - Crea un nuevo producto.
 * Obtiene los parametros pora crear el producto nuevo
 * y lo agrega a la lista de productos como uno nuevo.
 *
 * @return una respuesta JSON del producto creado.
 */
export const postProductoService = async ({ nombre, precio }) => {
  const producto = {
    id: crypto.randomUUID(),
    nombre: nombre,
    precio: precio,
    estado: true,
  };

  const nuevoProducto = await Producto.create(producto);

  productos.push(nuevoProducto);

  return nuevoProducto;
};

/**
 * - Edita un producto existente.
 * Obtiene los parametros pora Editar/Modificar el producto
 * y lo Edita/Modifica de la lista de productos.
 *
 * @return una respuesta JSON del producto editado/modificado.
 */
export const putProductoService = (id, nombre, precio) => {
  const producto = productos.find((p) => p.id == id);
  producto.nombre = nombre;
  producto.precio = precio;

  return producto;
};

/**
 * - Elimina un producto existente.
 * Borra el producto que coincida con el id.
 *
 * @return una respuesta JSON del producto eliminado.
 */
export const deleteProductoService = (id) => {
  const producto = productos.find((p) => p.id == id);
  producto.estado = false;
  return producto;
};

/**
 * - Elimina definitivamente un producto existente.
 * Borra definitivamente el producto que coincida con el id.
 *
 * @return una respuesta JSON del producto eliminado definitivamente.
 */
export const deleteDefinitivoService = (id) => {
  const producto = productos.find((p) => p.id == id);
  productos = productos.filter((p) => p.id != id);

  return producto;
};
