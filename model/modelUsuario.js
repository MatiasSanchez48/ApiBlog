import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
