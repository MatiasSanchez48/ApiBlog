import {
  getBlogsService,
  getBlogService,
  postBlogService,
  putBlogService,
  deleteBlogService,
} from "../services/serviceBlog.js";
export const getBlogsController = async (req, res) => {
  try {
    const blogs = await getBlogsService();
    return res
      .status(200)
      .json({ status: 200, message: "blogs obtenidos", data: { blogs } });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message, data: {} });
  }
};
export const getBlogController = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await getBlogService(id);
    res
      .status(200)
      .json({ status: 200, message: "blog obtenido", data: { blog } });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message, data: {} });
  }
};
export const getBlogPopuladoController = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await getBlogPopuladoService(id);
    res
      .status(200)
      .json({ status: 200, message: "blog obtenido", data: { blog } });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message, data: {} });
  }
};
export const postBlogController = async (req, res) => {
  try {
    const { titulo, descripcion, contenido, imagen, autor } = req.body;
    if (!titulo || !descripcion || !contenido || !imagen || !autor) {
      return res
        .status(400)
        .json({ status: 400, error: "faltan datos", data: {} });
    }
    const nuevoBlog = await postBlogService({
      titulo,
      descripcion,
      contenido,
      imagen,
      autor,
    });
    if (nuevoBlog) {
      return res.status(200).json({
        status: 200,
        message: "blog creado",
        data: { nuevoBlog },
      });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "blog no creado", data: {} });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message, data: {} });
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
      .json({ status: 200, message: "blog editado", data: { blog } });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message, data: {} });
  }
};
export const deleteBlogController = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await deleteBlogService(id);
    if (!blog) {
      return res
        .status(404)
        .json({ status: 404, error: "blog no encontrado", data: {} });
    } else {
      res
        .status(200)
        .json({ status: 200, message: "blog eliminado", data: { blog } });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message, data: {} });
  }
};
