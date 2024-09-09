import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Farmer } from "../entities/Farmer";

/**
 * @swagger
 * /dashboard/total-farms:
 *   get:
 *     summary: Get total number of farms
 *     description: Returns the total number of registered farms.
 *     responses:
 *       200:
 *         description: Total number of farms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalFarms:
 *                   type: integer
 *                   example: 10
 */
// Total de fazendas em quantidade
export const getTotalFarms = async (req: Request, res: Response) => {
  const farmerRepository = getRepository(Farmer);
  const totalFarms = await farmerRepository.count();
  return res.json({ totalFarms });
};

/**
 * @swagger
 * /dashboard/total-area:
 *   get:
 *     summary: Get total area of farms
 *     description: Returns the total area in hectares of all registered farms.
 *     responses:
 *       200:
 *         description: Total area in hectares
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalArea:
 *                   type: number
 *                   example: 1000.5
 */
// Total de fazendas em hectares (área total)
export const getTotalArea = async (req: Request, res: Response) => {
  const farmerRepository = getRepository(Farmer);
  const { totalArea } = await farmerRepository
    .createQueryBuilder("farmer")
    .select("SUM(farmer.totalArea)", "totalArea")
    .getRawOne();

  return res.json({ totalArea });
};

/**
 * @swagger
 * /dashboard/farms-by-state:
 *   get:
 *     summary: Get farms grouped by state
 *     description: Returns the number of farms grouped by state.
 *     responses:
 *       200:
 *         description: Farms grouped by state
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   state:
 *                     type: string
 *                     example: SP
 *                   count:
 *                     type: integer
 *                     example: 5
 */
// Gráfico de pizza por estado
export const getFarmsByState = async (req: Request, res: Response) => {
  const farmerRepository = getRepository(Farmer);
  const farmsByState = await farmerRepository
    .createQueryBuilder("farmer")
    .select("farmer.state", "state")
    .addSelect("COUNT(farmer.id)", "count")
    .groupBy("farmer.state")
    .getRawMany();

  return res.json(farmsByState);
};

/**
 * @swagger
 * /dashboard/farms-by-crop:
 *   get:
 *     summary: Get farms grouped by crop
 *     description: Returns the number of farms grouped by crop.
 *     responses:
 *       200:
 *         description: Farms grouped by crop
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   crops:
 *                     type: string
 *                     example: Soja
 *                   count:
 *                     type: integer
 *                     example: 4
 */
// Gráfico de pizza por cultura
export const getFarmsByCrop = async (req: Request, res: Response) => {
  const farmerRepository = getRepository(Farmer);
  const farmsByCrop = await farmerRepository
    .createQueryBuilder("farmer")
    .select("farmer.crops", "crops")
    .addSelect("COUNT(farmer.id)", "count")
    .groupBy("farmer.crops")
    .getRawMany();

  return res.json(farmsByCrop);
};

/**
 * @swagger
 * /dashboard/land-use:
 *   get:
 *     summary: Get land use data
 *     description: Returns the total agricultural and vegetation areas of all farms.
 *     responses:
 *       200:
 *         description: Land use data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalAgriculturalArea:
 *                   type: number
 *                   example: 500
 *                 totalVegetationArea:
 *                   type: number
 *                   example: 300
 */
// Gráfico de pizza por uso de solo
export const getLandUse = async (req: Request, res: Response) => {
  const farmerRepository = getRepository(Farmer);
  const landUse = await farmerRepository
    .createQueryBuilder("farmer")
    .select("SUM(farmer.agriculturalArea)", "totalAgriculturalArea")
    .addSelect("SUM(farmer.vegetationArea)", "totalVegetationArea")
    .getRawOne();

  return res.json(landUse);
};
