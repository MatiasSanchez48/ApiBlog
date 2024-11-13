import express from "express";
import routerProducto from "./router/router.js";
import cors from "cors";
import dorenv from "dotenv";
import mongoose from "mongoose";

dorenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/productos", routerProducto);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("conectado a la base de datos DoUw"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Example app listening on port 3000!");
});
