const request = require('supertest');
const sequelize = require('../config/database');
const Produtor = require('../models/Produtor');
const app = require('../index');

// Limpa a base de dados antes de cada teste
beforeEach(async () => {
  await sequelize.sync({ force: true });
});

// Fecha a conexão com o banco de dados após os testes
afterAll(async () => {
  await sequelize.close();
});

describe('Testes dos endpoints de produtores', () => {  

  test('Deve criar um novo produtor (POST /produtores)', async () => {
    const novoProdutor = { cpfCnpj: '70081010079', nomeProdutor: 'Produtor 2', nomeFazenda: 'Fazenda 2', cidade: 'Cidade 2', estado: 'Estado 2', areaTotal: 200, areaAgricultavel: 100, areaVegetacao: 100, culturasPlantadas: ['Cultura 2'] };
    
    const response = await request(app).post('/produtores').send(novoProdutor);

    expect(response.status).toBe(201);
    expect(response.body.cpfCnpj).toBe('70081010079');
  });

  test('Deve listar todos os produtores (GET /produtores)', async () => {
    await Produtor.create({ cpfCnpj: '70081010079', nomeProdutor: 'Produtor 1', nomeFazenda: 'Fazenda 1', cidade: 'Cidade 1', estado: 'Estado 1', areaTotal: 100, areaAgricultavel: 50, areaVegetacao: 50, culturasPlantadas: ['Cultura 1'] });

    const response = await request(app).get('/produtores');
    
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].cpfCnpj).toBe('70081010079');
  });

  test('Deve editar um produtor existente (PUT /produtores/:id)', async () => {
    const produtor = await Produtor.create({ cpfCnpj: '70081010079', nomeProdutor: 'Produtor 1', nomeFazenda: 'Fazenda 1', cidade: 'Cidade 1', estado: 'Estado 1', areaTotal: 100, areaAgricultavel: 50, areaVegetacao: 50, culturasPlantadas: ['Cultura 1'] });

    const dadosAtualizados = { cpfCnpj: '68435198146', nomeProdutor: 'Produtor Atualizado', nomeFazenda: 'Fazenda Atualizada', cidade: 'Cidade 2', estado: 'Estado 2', areaTotal: 200, areaAgricultavel: 100, areaVegetacao: 100, culturasPlantadas: ['Cultura 2'] };
    
    const response = await request(app).put(`/produtores/${produtor.id}`).send(dadosAtualizados);

    expect(response.status).toBe(200);
    expect(response.body.nomeProdutor).toBe('Produtor Atualizado');
  });

  test('Deve excluir um produtor existente (DELETE /produtores/:id)', async () => {
    const produtor = await Produtor.create({ cpfCnpj: '70081010079', nomeProdutor: 'Produtor 1', nomeFazenda: 'Fazenda 1', cidade: 'Cidade 1', estado: 'Estado 1', areaTotal: 100, areaAgricultavel: 50, areaVegetacao: 50, culturasPlantadas: ['Cultura 1'] });

    const response = await request(app).delete(`/produtores/${produtor.id}`);

    expect(response.status).toBe(204);
    
    const produtorExcluido = await Produtor.findByPk(produtor.id);
    expect(produtorExcluido).toBeNull();
  });

  test('Deve retornar 404 ao tentar editar um produtor inexistente (PUT /produtores/:id)', async () => {
    const response = await request(app).put('/produtores/999').send({ cpfCnpj: '70081010079' });
    
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Produtor não encontrado');
  });

  test('Deve retornar 404 ao tentar excluir um produtor inexistente (DELETE /produtores/:id)', async () => {
    const response = await request(app).delete('/produtores/999');
    
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Produtor não encontrado');
  });

});