import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fechaNacimiento: { type: Date, default: Date.now },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
