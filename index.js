const cors = require('cors');
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/database');
const Produtor = require('./models/Produtor');

const app = express();
const corsOptions = {
  origin: '*', // Permite todas as origens
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Cabeçalhos permitidos
};

app.use(cors(corsOptions)); 
app.use(express.json());

const dashboardRoutes = require('./routes/dashboard');
app.use('/dashboard', dashboardRoutes);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Brain Agriculture API',
      version: '1.0.0',
      description: "API para gerenciar dados de fazendas e produtores rurais."
    },
  },
  apis: [
    "./routes/*.js", 
    "index.js"       
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /produtores:
 *   post:
 *     summary: Cria um novo produtor
 *     tags:
 *       - Produtores
 *     parameters:
 *       - in: body
 *         name: Produtor
 *         description: Dados do novo produtor
 *         schema:
 *           type: object
 *           required:
 *             - cpfCnpj
 *             - nomeProdutor
 *             - nomeFazenda
 *             - cidade
 *             - estado
 *             - areaTotal
 *             - areaAgricultavel
 *             - areaVegetacao
 *             - culturasPlantadas
 *           properties:
 *             cpfCnpj:
 *               type: string
 *             nomeProdutor:
 *               type: string
 *             nomeFazenda:
 *               type: string
 *             cidade:
 *               type: string
 *             estado:
 *               type: string
 *             areaTotal:
 *               type: float
 *             areaAgricultavel:
 *               type: float
 *             areaVegetacao:
 *               type: float
 *             culturasPlantadas:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produtor criado
 */
app.post('/produtores', async (req, res) => {
  const produtor = await Produtor.create(req.body);
  res.status(201).json(produtor);
});

/**
 * @swagger
 * tags:
 *   - name: Produtores
 *     description: Endpoints relacionados a produtores rurais.
 */

/**
 * @swagger
 * /produtores:
 *   get:
 *     summary: Lista todos os produtores
 *     tags:
 *       - Produtores
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
 *                   id:
 *                     type: integer
 *                   cpfCnpj:
 *                     type: string
 *                   nomeProdutor:
 *                     type: string
 *                   nomeFazenda:
 *                     type: string
 *                   cidade:
 *                     type: string
 *                   estado:
 *                     type: string
 *                   areaTotal:
 *                     type: number
 *                     format: float
 *                   areaAgricultavel:
 *                     type: number
 *                     format: float
 *                   areaVegetacao:
 *                     type: number
 *                     format: float
 *                   culturasPlantadas:
 *                     type: array
 *                     items:
 *                       type: string
 */
app.get('/produtores', async (req, res) => {
  const produtores = await Produtor.findAll();
  res.json(produtores);
});

/**
 * @swagger
 * /produtores/{id}:
 *   put:
 *     summary: Edita um produtor existente
 *     tags:
 *       - Produtores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: body
 *         name: Produtor
 *         description: Dados do produtor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - cpfCnpj
 *                 - nomeProdutor
 *                 - nomeFazenda
 *                 - cidade
 *                 - estado
 *                 - areaTotal
 *                 - areaAgricultavel
 *                 - areaVegetacao
 *                 - culturasPlantadas
 *               properties:
 *                 cpfCnpj:
 *                   type: string
 *                 nomeProdutor:
 *                   type: string
 *                 nomeFazenda:
 *                   type: string
 *                 cidade:
 *                   type: string
 *                 estado:
 *                   type: string
 *                 areaTotal:
 *                   type: number
 *                   format: float
 *                 areaAgricultavel:
 *                   type: number
 *                   format: float
 *                 areaVegetacao:
 *                   type: number
 *                   format: float
 *                 culturasPlantadas:
 *                   type: array
 *                   items:
 *                     type: string
 *     responses:
 *       200:
 *         description: Produtor atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 cpfCnpj:
 *                   type: string
 *                 nomeProdutor:
 *                   type: string
 *                 nomeFazenda:
 *                   type: string
 *                 cidade:
 *                   type: string
 *                 estado:
 *                   type: string
 *                 areaTotal:
 *                   type: number
 *                   format: float
 *                 areaAgricultavel:
 *                   type: number
 *                   format: float
 *                 areaVegetacao:
 *                   type: number
 *                   format: float
 *                 culturasPlantadas:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Produtor não encontrado
 */
app.put('/produtores/:id', async (req, res) => {
  const { id } = req.params;
  const produtor = await Produtor.findByPk(id);
  if (produtor) {
    await produtor.update(req.body);
    res.json(produtor);
  } else {
    res.status(404).json({ error: 'Produtor não encontrado' });
  }
});

/**
 * @swagger
 * /produtores/{id}:
 *   delete:
 *     summary: Exclui um produtor existente
 *     tags:
 *       - Produtores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produtor excluído
 *       404:
 *         description: Produtor não encontrado
 */
app.delete('/produtores/:id', async (req, res) => {
  const { id } = req.params;
  const produtor = await Produtor.findByPk(id);
  if (produtor) {
    await produtor.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Produtor não encontrado' });
  }
});


sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});

module.exports = app;