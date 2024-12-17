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
      status: "success",
      message: "autores obtenidos",
      data: { autores },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAutorController = async (req, res) => {
  try {
    const id = req.params.id;
    const autor = await getAutorService(id);
    res
      .status(200)
      .json({ status: "success", message: "autor obtenido", data: { autor } });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      return res.status(400).json({ error: "faltan datos" });
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
        status: "success",
        message: "nuevo Autor creado",
        data: { nuevoAutor },
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "Autor no creado",
        data: { nuevoAutor },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
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
      return res.status(400).json({ error: "Faltan campos obligatorios" });
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
      .json({ status: "success", message: "autor editado", data: { autor } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteAutorController = async (req, res) => {
  try {
    const id = req.params.id;
    const autor = await deleteAutorService(id);
    if (!autor) {
      return res.status(404).json({ error: "autor no encontrado" });
    } else {
      return res.status(200).json({
        status: "success",
        message: "autor eliminado",
        data: { autor },
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
