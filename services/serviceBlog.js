import BlogModel from "../model/modelBlog.js";

export const getBlogsService = async () => {
  const blogs = await BlogModel.find({ isHabilitado: true });
  if (blogs.length === 0) {
    return res.status(404).json({ error: "blogs no encontrados" });
  }
  return blogs;
};
export const getBlogService = (id) => {
  const blog = BlogModel.findById(id);
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
}) => {
  const blog = await BlogModel.create({
    id: crypto.randomUUID(),
    titulo: titulo,
    descripcion: descripcion,
    contenido: contenido,
    imagen: imagen,
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
  const blog = await BlogModel.findByIdAndUpdate(
    { id },
    {
      titulo,
      descripcion,
      contenido,
      imagen,
    }
  );
  if (!blog) {
    return res.status(404).json({ error: "blog no encontrado" });
  }
  return blog;
};
export const deleteBlogService = async (id) => {
  const blog = await BlogModel.findByIdAndUpdate(
    { id: id },
    { isHabilitado: false }
  );
  if (!blog) {
    return res.status(404).json({ error: "blog no encontrado" });
  }
  return blog;
};
