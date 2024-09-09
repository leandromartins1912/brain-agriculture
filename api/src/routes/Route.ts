import { Router } from "express";
import { FarmerController } from "../controllers/FarmerController";
import {
  getTotalFarms,
  getTotalArea,
  getFarmsByState,
  getFarmsByCrop,
  getLandUse,
} from "../controllers/dashboardController";

const routes = Router();
const farmerController = new FarmerController();

// Rota para criar novo produtor rural
routes.post("/farmers", farmerController.create);
// Rota para listar todos os produtores
routes.get("/farmers", farmerController.list);
// Rota para listar produtor por id
routes.get("/farmers/:id", farmerController.read);
// Rota para editar produtor
routes.put("/farmers/:id", farmerController.update);
// Rota para deletar produtor
routes.delete("/farmers/:id", farmerController.delete);

// Rota para total de fazendas em quantidade
routes.get("/dashboard/total-farms", getTotalFarms);
// Rota para total de fazendas em hectares (área total)
routes.get("/dashboard/total-area", getTotalArea);
// Rota para gráfico de pizza por estado
routes.get("/dashboard/farms-by-state", getFarmsByState);
// Rota para gráfico de pizza por cultura
routes.get("/dashboard/farms-by-crop", getFarmsByCrop);
// Rota para gráfico de pizza por uso de solo (área agricultável e vegetação)
routes.get("/dashboard/land-use", getLandUse);

export default routes;
