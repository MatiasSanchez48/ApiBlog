import BlogModel from "../model/modelBlog.js";
import AutorModel from "../model/modelAutores.js";

export const getBlogsService = async () => {
  const blogs = await BlogModel.find({ isHabilitado: true });
  if (blogs.length === 0) {
    return [];
  }
  return blogs;
};
export const getBlogService = async (id) => {
  const blog = await BlogModel.findOne({ id: id });
  if (!blog) {
    return res.status(404).json({ error: "blog no encontrado" });
  }

  return blog;
};
export const getBlogPopuladoService = (id) => {
  const blog = BlogModel.findById({ id: id }).populate("autor");
  if (!blog) {
    return res.status(404).json({ error: "blog no encontrado" });
  }
  return blog;
};
export const postBlogService = async ({
  titulo,
  descripcion,
  contenido,
  imagen,
  autor,
}) => {
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
};
export const putBlogService = async (
  id,
  titulo,
  descripcion,
  contenido,
  imagen
) => {
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
  );
  if (!blog) {
    return res.status(404).json({ error: "blog no encontrado" });
  }
  return blog;
};
export const deleteBlogService = async (id) => {
  const blog = await BlogModel.findOneAndUpdate(
    { id: id },
    { isHabilitado: false },
    { new: true }
  );
  if (!blog) {
    return res.status(404).json({ error: "blog no encontrado" });
  }
  return blog;
};
