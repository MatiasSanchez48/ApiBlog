import {
  getAutoresService,
  getAutorService,
  postAutorService,
  putAutorService,
  deleteAutorService,
} from "../services/serviceAutor.js";

export const getAutoresController = async (req, res) => {
  try {
    const autores = await getAutoresService();
    res.status(200).json({
      status: 200,
      message: "autores obtenidos",
      data: { autores },
    });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message, data: {} });
  }
};
export const getAutorController = async (req, res) => {
  try {
    const id = req.params.id;
    const autor = await getAutorService(id);
    res
      .status(200)
      .json({ status: 200, message: "autor obtenido", data: { autor } });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message, data: {} });
  }
};
export const postAutorController = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      nacionalidad,
      fechaNacimiento,
      bibliografia,
      imagen,
      redSocial,
    } = req.body;
    if (
      !nombre ||
      !apellido ||
      !nacionalidad ||
      !fechaNacimiento ||
      !bibliografia ||
      !imagen ||
      !redSocial
    ) {
      return res
        .status(400)
        .json({ status: 400, error: "faltan datos", data: {} });
    }
    const nuevoAutor = await postAutorService({
      nombre,
      apellido,
      nacionalidad,
      fechaNacimiento,
      bibliografia,
      imagen,
      redSocial,
    });

    if (nuevoAutor) {
      return res.status(200).json({
        status: 200,
        message: "nuevo Autor creado",
        data: { nuevoAutor },
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Autor no creado",
        data: { nuevoAutor },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "error al crear el Autor",
      data: { message: error.message },
    });
  }
};
export const putAutorController = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      nombre,
      apellido,
      nacionalidad,
      fechaNacimiento,
      bibliografia,
      imagen,
      redSocial,
    } = req.body;
    if (
      !nombre ||
      !apellido ||
      !nacionalidad ||
      !fechaNacimiento ||
      !bibliografia ||
      !imagen ||
      !redSocial
    ) {
      return res
        .status(400)
        .json({ status: 400, error: "Faltan campos obligatorios", data: {} });
    }
    const autorModificado = {
      nombre,
      apellido,
      nacionalidad,
      fechaNacimiento,
      bibliografia,
      imagen,
      redSocial,
    };
    const autor = await putAutorService(id, autorModificado);
    res
      .status(200)
      .json({ status: 200, message: "autor editado", data: { autor } });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message, data: {} });
  }
};
export const deleteAutorController = async (req, res) => {
  try {
    const id = req.params.id;
    const autor = await deleteAutorService(id);
    if (!autor) {
      return res
        .status(404)
        .json({ status: 404, error: "autor no encontrado", data: {} });
    } else {
      return res.status(200).json({
        status: 200,
        message: "autor eliminado",
        data: { autor },
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message, data: {} });
  }
};
