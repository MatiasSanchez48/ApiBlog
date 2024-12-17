import mongoose from "mongoose";

export const AutorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, default: "" },
  nacionalidad: { type: String, default: "" },
  fechaNacimiento: { type: Date, default: Date.now },
  bibliografia: { type: String, default: "" },
  imagen: { type: String, default: "" },
  redSocial: { type: String, default: "" },
  isHabilitado: { type: Boolean, default: true },
});

const AutorModel = mongoose.model("Autor", AutorSchema);

export default AutorModel;
