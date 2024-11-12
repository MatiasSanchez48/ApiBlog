import express from "express";
import routerProducto from "./router/router.js";
import cors from "cors";

const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/productos", routerProducto);

app.listen(port, () => {
  console.log("Example app listening on port 3000!");
});
