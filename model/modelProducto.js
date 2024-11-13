import mongoose from "mongoose";

const Producto = new mongoose.Schema({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  precio: { type: Number, default: 0 },
  stock: { type: Number },
  estado: { type: Boolean, default: true },
});

export default mongoose.model("Producto", Producto);
