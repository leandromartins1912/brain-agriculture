import request from "supertest";
import {
  getRepository,
  Repository,
  SelectQueryBuilder,
  getConnection,
} from "typeorm";
import app from "../index";

// Mock do repositório e QueryBuilder
jest.mock("typeorm", () => {
  const actualTypeORM = jest.requireActual("typeorm");
  return {
    ...actualTypeORM,
    getRepository: jest.fn(),
  };
});

const logSpy = jest.spyOn(console, "log") as jest.Mock;
jest.setTimeout(30000);

describe("DashBoard Controller", () => {
  let farmerRepositoryMock: jest.Mocked<Repository<any>>;
  let queryBuilderMock: jest.Mocked<SelectQueryBuilder<any>>;

  beforeEach(() => {
    logSpy.mockImplementation(() => {});
    queryBuilderMock = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawOne: jest.fn(),
      getRawMany: jest.fn(),
    } as unknown as jest.Mocked<SelectQueryBuilder<any>>;

    farmerRepositoryMock = {
      count: jest.fn(),
      createQueryBuilder: jest.fn().mockReturnValue(queryBuilderMock),
    } as unknown as jest.Mocked<Repository<any>>;

    (getRepository as jest.Mock).mockReturnValue(farmerRepositoryMock);
  });

  afterAll(async () => {
    const connection = getConnection();
    if (connection.isConnected) {
      await connection.close(); // Fecha a conexão com o banco após todos os testes
    }
    logSpy.mockRestore();
  });

  it("should return total farms count", async () => {
    farmerRepositoryMock.count.mockResolvedValue(10); // Mock de retorno
    const response = await request(app).get("/dashboard/total-farms");
    expect(response.status).toBe(200);
    expect(response.body.totalFarms).toBe(10);
    expect(farmerRepositoryMock.count).toHaveBeenCalled();
  });

  it("should return total area in hectares", async () => {
    queryBuilderMock.getRawOne.mockResolvedValue({ totalArea: 1000 });
    const response = await request(app).get("/dashboard/total-area");
    expect(response.status).toBe(200);
    expect(response.body.totalArea).toBe(1000);
    expect(farmerRepositoryMock.createQueryBuilder).toHaveBeenCalledWith(
      "farmer"
    );
    expect(queryBuilderMock.select).toHaveBeenCalledWith(
      "SUM(farmer.totalArea)",
      "totalArea"
    );
    expect(queryBuilderMock.getRawOne).toHaveBeenCalled();
  });

  it("should return farms grouped by state", async () => {
    const farmsByStateMock = [
      { state: "SP", count: 5 },
      { state: "MG", count: 3 },
    ];
    queryBuilderMock.getRawMany.mockResolvedValue(farmsByStateMock);
    const response = await request(app).get("/dashboard/farms-by-state");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(farmsByStateMock);
    expect(queryBuilderMock.groupBy).toHaveBeenCalledWith("farmer.state");
    expect(queryBuilderMock.getRawMany).toHaveBeenCalled();
  });

  it("should return farms grouped by crops", async () => {
    const farmsByCropMock = [
      { crops: "Soja", count: 4 },
      { crops: "Milho", count: 2 },
    ];
    queryBuilderMock.getRawMany.mockResolvedValue(farmsByCropMock);
    const response = await request(app).get("/dashboard/farms-by-crop");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(farmsByCropMock);
    expect(queryBuilderMock.groupBy).toHaveBeenCalledWith("farmer.crops");
    expect(queryBuilderMock.getRawMany).toHaveBeenCalled();
  });

  it("should return land use data", async () => {
    const landUseMock = {
      totalAgriculturalArea: 500,
      totalVegetationArea: 300,
    };
    queryBuilderMock.getRawOne.mockResolvedValue(landUseMock);
    const response = await request(app).get("/dashboard/land-use");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(landUseMock);
    expect(queryBuilderMock.getRawOne).toHaveBeenCalled();
  });
});
