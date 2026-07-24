import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import itemsRouter from "./routes/items.js";
import { swaggerSpec } from "./swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (req, res) => {
  res.json(swaggerSpec);
});
app.use("/api/items", itemsRouter);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "CRUD backend funcionando" });
});

export default app;
