import mongoose from "mongoose";

export const AutorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  nacionalidad: { type: String, required: true },
  fechaNacimiento: { type: Date, default: Date.now },
  bibliografia: { type: String, required: true },
  imagen: { type: String, required: true },
  redSocial: { type: String, required: true },
  isHabilitado: { type: Boolean, default: true },
});

const AutorModel = mongoose.model("Autor", AutorSchema);

export default AutorModel;
