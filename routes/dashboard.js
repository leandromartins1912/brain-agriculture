const express = require('express');
const { Op } = require('sequelize');
const Produtor = require('../models/Produtor');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Dashboard
 *     description: Endpoints relacionados a dashboard.
 */

/**
 * @swagger
 * /dashboard/total-fazendas:
 *   get:
 *     summary: Retorna o total de fazendas e a área total em hectares.
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalFazendas:
 *                   type: integer
 *                 totalArea:
 *                   type: number
 *                   format: float
 */
router.get('/total-fazendas', async (req, res) => {
  const count = await Produtor.count();
  const totalArea = await Produtor.sum('areaTotal');
  res.json({ totalFazendas: count, totalArea });
});

/**
 * @swagger
 * /dashboard/por-estado:
 *   get:
 *     summary: Retorna o total de fazendas agrupadas por estado.
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   estado:
 *                     type: string
 *                   total:
 *                     type: integer
 */

router.get('/por-estado', async (req, res) => {
  const fazendasPorEstado = await Produtor.findAll({
    attributes: ['estado', [sequelize.fn('COUNT', sequelize.col('estado')), 'total']],
    group: ['estado']
  });
  res.json(fazendasPorEstado);
});

/**
 * @swagger
 * /dashboard/por-cultura:
 *   get:
 *     summary: Retorna o total de fazendas agrupadas por cultura.
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   culturasPlantadas:
 *                     type: string
 *                   total:
 *                     type: integer
 */

router.get('/por-cultura', async (req, res) => {
  const fazendasPorCultura = await Produtor.findAll({
    attributes: ['culturasPlantadas', [sequelize.fn('COUNT', sequelize.col('culturasPlantadas')), 'total']],
    group: ['culturasPlantadas']
  });
  res.json(fazendasPorCultura);
});

/**
 * @swagger
 * /dashboard/uso-solo:
 *   get:
 *     summary: Retorna a soma das áreas agricultáveis e de vegetação.
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalAgricultavel:
 *                   type: number
 *                   format: float
 *                 totalVegetacao:
 *                   type: number
 *                   format: float
 */

router.get('/uso-solo', async (req, res) => {
  const usoSolo = await Produtor.findAll({
    attributes: [
      [sequelize.fn('SUM', sequelize.col('areaAgricultavel')), 'totalAgricultavel'],
      [sequelize.fn('SUM', sequelize.col('areaVegetacao()')), 'totalVegetacao']
    ]
  });
  res.json(usoSolo[0]);
});

module.exports = router;
