import express from "express";
import { routerProducto, routerBlog } from "./router/router.js";
import cors from "cors";
import dorenv from "dotenv";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

dorenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/productos", routerProducto);
app.use("/blog", routerBlog);
//? normalmente esta en /docs
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("conectado a la base de datos DoUw"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Example app listening on port 3000!");
});
