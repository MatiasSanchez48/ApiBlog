import express from "express";
import {
  routerProducto,
  routerBlog,
  routerAutores,
  routerUsuario,
} from "./router/router.js";

import cors from "cors";
import dorenv from "dotenv";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import { authMiddleware } from "./middleware/authMiddleWare.js";
import { logger } from "./config/Winston.js";

import fs from "fs";

dorenv.config();

const swaggerDocument = JSON.parse(
  fs.readFileSync(new URL("./swagger.json", import.meta.url))
);
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use;
cors({
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization", "x-refresh-token"],
});

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use("/productos", routerProducto);
app.use("/blog", routerBlog);
app.use("/autores", routerAutores);
app.use("/auth", routerUsuario);

app.use("/protected", authMiddleware, (req, res) => {
  return res
    .status(200)
    .json({ status: "success", message: "acceso concedido", data: req.user });
});

//? normalmente esta en /docs la documentacion de las apis usadas en el proyecto
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req, res) => {
  return res.status(404).json({ error: "ruta no encontrada" });
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("conectado a la base de datos DoUw"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Example app listening on port 3000!");
});
