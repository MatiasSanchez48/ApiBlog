import AutorModel from "../model/modelAutores.js";

import crypto from "node:crypto";

export const getAutoresService = async () => {
  try {
    const autores = await AutorModel.find({ isHabilitado: true });
    if (autores.length === 0) {
      return res
        .status(404)
        .json({ status: 404, error: "autores no encontrados", data: {} });
    }
    return autores;
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: error.message, data: {} });
  }
};
export const getAutorService = async (id) => {
  try {
    const autor = await AutorModel.findOne({ id: id });
    if (!autor) {
      return res
        .status(404)
        .json({ status: 404, error: "autor no encontrado", data: {} });
    }
    return autor;
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: error.message, data: {} });
  }
};
export const postAutorService = async (autorData) => {
  try {
    if (
      autorData.id === "" ||
      autorData.id === undefined ||
      autorData.id === null
    ) {
      autorData.id = crypto.randomUUID();
    }
    const autor = await AutorModel.create({
      ...autorData,
      isHabilitado: true,
    });

    return autor;
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: error.message, data: {} });
  }
};
export const putAutorService = async (id, autor) => {
  try {

    const autorModificado = await AutorModel.findOneAndUpdate(
      { id: id },
      autor,
      {
        new: true,
      }
    );
    return autorModificado;
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: error.message, data: {} });
  }
};
export const deleteAutorService = async (id) => {
  try {
    const autor = await AutorModel.findOneAndUpdate(
      { id: id },
      { isHabilitado: false },
      { new: true }
    );
    if (!autor) {
      return res
        .status(404)
        .json({ status: 404, error: "autor no encontrado", data: {} });
    }
    return autor;
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, error: error.message, data: {} });
  }
};
