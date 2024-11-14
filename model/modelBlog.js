import mongoose from "mongoose";
export const BlogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  contenido: { type: String, required: true },
  imagen: { type: String, required: true },
  fechaPublicacion: { type: Date, default: Date.now },
  isHabilitado: { type: Boolean, default: true },
  // autor: objetc.id,
});

const BlogModel = mongoose.model("Blog", BlogSchema);

export default BlogModel;
