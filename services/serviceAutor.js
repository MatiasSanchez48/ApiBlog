import { AutorModel } from "../model/modelAutores.js";

export const getAutoresService = async () => {
  const autores = await AutorModel.find({ isHabilitado: true });
  if (autores.length === 0) {
    return res.status(404).json({ error: "autores no encontrados" });
  }
  return autores;
};
export const getAutorService = async (id) => {
  const autor = await AutorModel.findById(id);
  if (!autor) {
    return res.status(404).json({ error: "autor no encontrado" });
  }
  return autor;
};
export const postAutorService = async (
  nombre,
  apellido,
  nacionalidad,
  fechaNacimiento,
  bibliografia,
  imagen,
  redSocial
) => {
  const autor = await AutorModel.create({
    id: crypto.randomUUID(),
    nombre: nombre,
    apellido: apellido,
    nacionalidad: nacionalidad,
    fechaNacimiento: fechaNacimiento,
    bibliografia: bibliografia,
    imagen: imagen,
    redSocial: redSocial,
    isHabilitado: true,
  });

  return autor;
};
export const putAutorService = async (id, autor) => {
  const autorModificado = await AutorModel.findByIdAndUpdate(id, autor);
  return autorModificado;
};
export const deleteAutorService = async (id) => {
  const autor = await AutorModel.findByIdAndDelete(id);
  if (!autor) {
    return res.status(404).json({ error: "autor no encontrado" });
  }
  return autor;
};
