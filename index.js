import express from "express";
import cors from "cors";
import dorenv from "dotenv";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import fs from "fs";

import {
  routerProducto,
  routerBlog,
  routerAutores,
  routerUsuario,
} from "./router/router.js";
import { authMiddleWare } from "./middleware/authMiddleWare.js";
import { logger } from "./config/Winston.js";

const port = process.env.PORT || 3000;

dorenv.config();
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

cors({
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization", "x-refresh-token"],
});

const swaggerDocument = JSON.parse(
  fs.readFileSync(new URL("./swagger.json", import.meta.url))
);

app.use("/productos", routerProducto);
app.use("/blog", routerBlog);
app.use("/autores", routerAutores);
app.use("/auth", routerUsuario);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/protected", authMiddleWare, (req, res) => {
  return res
    .status(200)
    .json({ status: "success", message: "acceso concedido", data: req.user });
});

app.use((req, res) => {
  return res.status(404).json({ error: "ruta no encontrada" });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    logger.info("conectado a la base de datos");
  })
  .catch((err) => logger.error(err));

app.listen(port, () => {
  logger.info("Example app listening on port: " + port);
});
