import request from "supertest";
import { getConnection } from "typeorm";
import app from "../index";

const logSpy = jest.spyOn(console, "log") as jest.Mock;

beforeAll(async () => {
  logSpy.mockImplementation(() => {});
  const connection = getConnection();
  if (!connection.isConnected) {
    await connection.connect();
  }

  // Limpar os dados diretamente com comandos SQL
  await connection.query("TRUNCATE TABLE farmer RESTART IDENTITY CASCADE");
});

afterAll(async () => {
  const connection = getConnection();
  if (connection.isConnected) {
    await connection.query("TRUNCATE TABLE farmer RESTART IDENTITY CASCADE");
    await connection.close();
  }

  logSpy.mockRestore();
});

describe("POST /farmers", () => {
  it("should create a new farmer with CPF", async () => {
    const response = await request(app)
      .post("/farmers")
      .send({
        document: "01522361120",
        name: "John Doe",
        farmName: "Green Farm",
        city: "Smallville",
        state: "SP",
        totalArea: 1000,
        agriculturalArea: 600,
        vegetationArea: 300,
        crops: ["Soja", "Milho"],
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data.id");
  });

  it("should create a new farmer with CNPJ", async () => {
    const response = await request(app)
      .post("/farmers")
      .send({
        document: "12345678000195",
        name: "ABC Ltda",
        farmName: "Big Farm",
        city: "Metropolis",
        state: "SP",
        totalArea: 2000,
        agriculturalArea: 1200,
        vegetationArea: 600,
        crops: ["Café", "Cana de Açúcar"],
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data.id");
  });

  it("should return 400 if agricultural and vegetation area exceed total area", async () => {
    const response = await request(app)
      .post("/farmers")
      .send({
        document: "12345678901",
        name: "John Doe",
        farmName: "Small Farm",
        city: "Smallville",
        state: "SP",
        totalArea: 1000,
        agriculturalArea: 600,
        vegetationArea: 500,
        crops: ["Soja"],
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "A área agrícola e de vegetação não pode exceder a área total"
    );
  });
});

describe("GET /farmers", () => {
  it("should list all farmers", async () => {
    const response = await request(app).get("/farmers");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /farmers/:id", () => {
  it("should get a single farmer by ID", async () => {
    const response = await request(app).get("/farmers/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
  });

  it("should return 404 if farmer is not found", async () => {
    const response = await request(app).get("/farmers/999");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Agricultor não encontrado.");
  });
});

describe("PUT /farmers/:id", () => {
  it("should update an existing farmer", async () => {
    const response = await request(app)
      .put("/farmers/1")
      .send({
        document: "01522361120",
        name: "John Doe Updated",
        farmName: "Updated Farm",
        city: "Updatedville",
        state: "SP",
        totalArea: 1500,
        agriculturalArea: 900,
        vegetationArea: 500,
        crops: ["Milho", "Café"],
      });
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("John Doe Updated");
  });

  it("should return 400 if agricultural and vegetation area exceed total area", async () => {
    const response = await request(app)
      .put("/farmers/1")
      .send({
        document: "12345678901",
        name: "John Doe Updated",
        farmName: "Updated Farm",
        city: "Updatedville",
        state: "SP",
        totalArea: 1000,
        agriculturalArea: 700,
        vegetationArea: 400,
        crops: ["Milho"],
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "A área agrícola e de vegetação não pode exceder a área total"
    );
  });

  it("should return 404 if farmer is not found", async () => {
    const response = await request(app)
      .put("/farmers/999")
      .send({
        document: "12345678901",
        name: "John Doe",
        farmName: "Non-Existent Farm",
        city: "Nowhere",
        state: "SP",
        totalArea: 1000,
        agriculturalArea: 600,
        vegetationArea: 300,
        crops: ["Milho"],
      });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Agricultor não encontrado.");
  });
});

describe("DELETE /farmers/:id", () => {
  it("should delete a farmer", async () => {
    const response = await request(app).delete("/farmers/1");
    expect(response.status).toBe(204);
  });

  it("should return 404 if farmer is not found", async () => {
    const response = await request(app).delete("/farmers/999");
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Agricultor não encontrado.");
  });
});
