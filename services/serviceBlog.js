import BlogModel from "../model/modelBlog.js";
import AutorModel from "../model/modelAutores.js";

export const getBlogsService = async (limit, page) => {
  try {
    const skip = (page - 1) * limit;
    const blogs = await BlogModel.find({ isHabilitado: true })
      .populate("autor")
      .skip(skip)
      .limit(limit);
    if (blogs.length === 0) {
      return [];
    }
    const cantidad = await BlogModel.find({
      isHabilitado: true,
    }).countDocuments();

    const respuesta = {
      blogs: blogs,
      cantidad: cantidad,
      cantidadActual: Math.ceil(cantidad / limit),
      paginaActual: page,
    };

    return respuesta;
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: error.message, data: {} });
  }
};
export const getBlogService = async (id) => {
  try {
    const blog = await BlogModel.findOne({ id: id }).populate("autor");
    if (!blog) {
      return res
        .status(404)
        .json({ status: 404, error: "blog no encontrado", data: {} });
    }

    return blog;
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: error.message, data: {} });
  }
};

export const getBlogPopuladoService = (id) => {
  try {
    const blog = BlogModel.findById({ id: id }).populate("autor");
    if (!blog) {
      return res
        .status(404)
        .json({ status: 404, error: "blog no encontrado", data: {} });
    }
    return blog;
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: error.message, data: {} });
  }
};

export const getBlogsByAutorService = async (limit, page, idAutor) => {
  try {
    const limite = Number(limit);
    const skip = (page - 1) * limite;

    const autorDB = await AutorModel.findOne({ id: idAutor });
    if (!autorDB) {
      throw new Error("El autor no existe en la base de datos.");
    }

    const allBlogs = await BlogModel.find({ isHabilitado: true }).populate(
      "autor"
    );

    const blogsDelAutor = allBlogs.filter((blog) => blog.autor.id == idAutor);
    const blogs = blogsDelAutor.slice(skip, skip + limite);

    if (!blogs || blogs.length === 0) {
      return [];
    }

    const cantidad = blogsDelAutor.length;

    const respuesta = {
      blogs: blogs,
      cantidad: cantidad,
      cantidadActual: Math.ceil(cantidad / limit),
      paginaActual: page,
    };

    return respuesta;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const postBlogService = async ({
  titulo,
  descripcion,
  contenido,
  imagen,
  autor,
}) => {
  try {
    const autorDB = await AutorModel.findOne({ id: autor });
    if (!autorDB) {
      throw new Error("El autor no existe en la base de datos.");
    }
    const blog = await BlogModel.create({
      id: crypto.randomUUID(),
      titulo: titulo,
      descripcion: descripcion,
      contenido: contenido,
      imagen: imagen,
      autor: autorDB,
    });

    return blog;
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: error.message, data: {} });
  }
};
export const putBlogService = async (
  id,
  titulo,
  descripcion,
  contenido,
  imagen
) => {
  try {
    const blog = await BlogModel.findOneAndUpdate(
      { id: id },
      {
        titulo,
        descripcion,
        contenido,
        imagen,
      },
      {
        new: true,
      }
    ).populate("autor");
    if (!blog) {
      return res
        .status(404)
        .json({ status: 404, error: "blog no encontrado", data: {} });
    }
    return blog;
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: error.message, data: {} });
  }
};
export const deleteBlogService = async (id) => {
  try {
    const blog = await BlogModel.findOneAndUpdate(
      { id: id },
      { isHabilitado: false },
      { new: true }
    ).populate("autor");
    if (!blog) {
      return res
        .status(404)
        .json({ status: 404, error: "blog no encontrado", data: {} });
    }
    return blog;
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: error.message, data: {} });
  }
};
