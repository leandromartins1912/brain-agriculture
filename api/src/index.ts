import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import routes from "./routes/Route";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3001", // Permite requisições do frontend em localhost:3001
  })
);

app.use(express.json());
app.use(routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

createConnection()
  .then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((error) => console.log(error));

export default app; // Exporta app como exportação padrão
