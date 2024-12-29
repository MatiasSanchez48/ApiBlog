import Producto from "../model/modelProducto.js";

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
export const getProductosService = async () => {
  return await Producto.find({ estado: true });
};

export const getProductosPaginadosService = async (limit, page) => {
  //? el limit es la cantidad que quiero que devuelva por pagina.
  //? ===>
  //? el page es la pagina que quiero que devuelva.
  const skip = (page - 1) * limit;
  const productos = await Producto.find({ estado: true })
    .skip(skip)
    .limit(limit);
  const cantidad = await Producto.find({ estado: true }).countDocuments();
  const respuesta = {
    productos: productos,
    cantidad: cantidad,
    cantidadActual: Math.ceil(cantidad / limit),
    paginaActual: page,
  };
  return respuesta;
};
export const getProductosFiltradosService = async (
  limit,
  page,
  nombre,
  precioMin,
  precioMax,
  orderBy,
  order
) => {
  try {
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
    const productosFiltrados = await Producto.find(filtros)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    const cantidad = await Producto.find(filtros).countDocuments();
    const respuesta = {
      productos: productosFiltrados,
      cantidad: cantidad,
      cantidadActual: Math.ceil(cantidad / limit),
      paginaActual: page,
    };
 
    return respuesta;
  } catch (error) {
    return new Error("Error al filtrar los productos: " + error.message);
  }
};
/**
 * - Obtiene un producto.
 * Obtiene el producto que coincida con el id de todos los productos.
 *
 * @return una respuesta JSON del producto.
 */
export const getProductoService = async (id) => {
  const producto = await Producto.findOne({ id: id });
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

  return nuevoProducto;
};

/**
 * - Edita un producto existente.
 * Obtiene los parametros pora Editar/Modificar el producto
 * y lo Edita/Modifica de la lista de productos.
 *
 * @return una respuesta JSON del producto editado/modificado.
 */
export const putProductoService = async (id, nombre, precio) => {
  const producto = await Producto.findOne({ id: id });
  const productoModificado = await Producto.findByIdAndUpdate(
    producto._id,
    {
      nombre: nombre,
      precio: precio,
    },
    { new: true }
  );
  return productoModificado;
};

/**
 * - Elimina un producto existente.
 * Borra el producto que coincida con el id.
 *
 * @return una respuesta JSON del producto eliminado.
 */
export const deleteProductoService = async (id) => {
  const producto = await Producto.findOne({ id: id });
  if (!producto) {
    return { error: "Producto no encontrado" };
  }

  const productoModificado = await Producto.findByIdAndUpdate(
    producto._id,
    { estado: false },
    { new: true }
  );

  return productoModificado;
};

/**
 * - Elimina definitivamente un producto existente.
 * Borra definitivamente el producto que coincida con el id.
 *
 * @return una respuesta JSON del producto eliminado definitivamente.
 */
export const deleteDefinitivoService = async (id) => {
  const producto = await Producto.findOne({ id: id });
  if (!producto) {
    return { error: "Producto no encontrado" };
  }

  const productoEliminado = await Producto.findByIdAndDelete(producto._id);

  if (!productoEliminado) {
    return { error: "No se pudo eliminar el producto" };
  }
  return productoEliminado;
};
