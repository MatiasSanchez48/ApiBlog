import {
  getBlogsService,
  getBlogService,
  postBlogService,
  putBlogService,
  deleteBlogService,
} from "../services/serviceBlog.js";
export const getBlogsController = async (req, res) => {
  try {
    res.send("blog");
    const blogs = await getBlogsService();
    res
      .status(200)
      .json({ status: "success", message: "blogs obtenidos", data: { blogs } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getBlogController = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await getBlogService(id);
    res
      .status(200)
      .json({ status: "success", message: "blog obtenido", data: { blog } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};export const getBlogPopuladoController = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await getBlogPopuladoService(id);
    res
      .status(200)
      .json({ status: "success", message: "blog obtenido", data: { blog } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const postBlogController = async (req, res) => {
  try {
    const { titulo, descripcion, contenido, imagen } = req.body;
    if (!titulo || !descripcion || !contenido || !imagen) {
      return res.status(400).json({ error: "faltan datos" });
    }
    const nuevoBlog = await postBlogService({
      titulo,
      descripcion,
      contenido,
      imagen,
    });
    if (nuevoBlog) {
      return res
        .status(200)
        .json({ status: "success", message: "blog creado", data: { blog } });
    } else {
      return res
        .status(400)
        .json({ status: "error", message: "blog no creado", data: { blog } });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const putBlogController = async (req, res) => {
  try {
    const id = req.params.id;
    const { titulo, descripcion, contenido, imagen } = req.body;
    const blog = await putBlogService(
      id,
      titulo,
      descripcion,
      contenido,
      imagen
    );
    res
      .status(200)
      .json({ status: "success", message: "blog editado", data: { blog } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteBlogController = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await deleteBlogService(id);
    if (!blog) {
      return res.status(404).json({ error: "blog no encontrado" });
    } else {
      res
        .status(200)
        .json({ status: "success", message: "blog eliminado", data: { blog } });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
