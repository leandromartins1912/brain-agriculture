import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Farmer } from "../entities/Farmer";
import { validateCPF, validateCNPJ } from "../validations/documentValidation";

type DocumentLength = 11 | 14;

const validators: Record<DocumentLength, (document: string) => boolean> = {
  11: validateCPF,
  14: validateCNPJ,
};

export class FarmerController {
  async create(req: Request, res: Response) {
    const {
      document,
      name,
      farmName,
      city,
      state,
      totalArea,
      agriculturalArea,
      vegetationArea,
      crops,
    } = req.body;

    if (Number(agriculturalArea) + Number(vegetationArea) > Number(totalArea)) {
      return res.status(400).json({
        message: "A área agrícola e de vegetação não pode exceder a área total",
      });
    }

    const documentLength = document.length as DocumentLength;
    const validateDocument = validators[documentLength];

    if (!validateDocument) {
      return res.status(400).json({
        message: "O documento deve ter 11 (CPF) ou 14 (CNPJ) dígitos",
      });
    }

    if (!validateDocument(document)) {
      return res.status(400).json({
        message: `Inválido ${document.length === 11 ? "CPF" : "CNPJ"}`,
      });
    }

    const farmerRepository = getRepository(Farmer);

    try {
      const existingFarmer = await farmerRepository.findOne({
        where: { document: document },
      });

      if (existingFarmer) {
        return res
          .status(400)
          .json({ message: "Já existe agricultor com este documento" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Erro ao verificar documento" });
    }

    const farmer = new Farmer();
    farmer.document = document;
    farmer.name = name;
    farmer.farmName = farmName;
    farmer.city = city;
    farmer.state = state;
    farmer.totalArea = Number(totalArea);
    farmer.agriculturalArea = Number(agriculturalArea);
    farmer.vegetationArea = Number(vegetationArea);
    farmer.crops = crops;

    try {
      await farmerRepository.save(farmer);
      return res
        .status(201)
        .json({ message: "Agricultor adicionado com sucesso.", data: farmer });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar o Agricultor" });
    }
  }

  // List all farmers
  async list(req: Request, res: Response) {
    const farmerRepository = getRepository(Farmer);
    const farmers = await farmerRepository.find();
    return res.status(200).json(farmers);
  }

  // Get a single farmer by ID
  async read(req: Request, res: Response) {
    const { id } = req.params;
    const farmerRepository = getRepository(Farmer);

    try {
      const farmer = await farmerRepository.findOneOrFail({
        where: { id: Number(id) },
      });
      return res.status(200).json(farmer);
    } catch (error) {
      return res.status(404).json({ message: "Agricultor não encontrado." });
    }
  }

  // Update a farmer by ID
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      document,
      name,
      farmName,
      city,
      state,
      totalArea,
      agriculturalArea,
      vegetationArea,
      crops,
    } = req.body;

    const farmerRepository = getRepository(Farmer);

    try {
      // Tenta buscar o agricultor pelo ID, se não achar, lança o erro
      const farmer = await farmerRepository.findOne({
        where: { id: Number(id) },
      });

      // Se o agricultor não for encontrado, retorna 404
      if (!farmer) {
        return res.status(404).json({ message: "Agricultor não encontrado." });
      }

      // Validação das áreas
      if (
        Number(agriculturalArea) + Number(vegetationArea) >
        Number(totalArea)
      ) {
        return res.status(400).json({
          message:
            "A área agrícola e de vegetação não pode exceder a área total",
        });
      }

      // Validação do CPF ou CNPJ
      const documentLength = document.length as DocumentLength;
      const validateDocument = validators[documentLength];

      if (!validateDocument) {
        return res.status(400).json({
          message: "O documento deve ter 11 (CPF) ou 14 (CNPJ) dígitos.",
        });
      }

      if (!validateDocument(document)) {
        return res.status(400).json({
          message: `Inválido ${document.length === 11 ? "CPF" : "CNPJ"}`,
        });
      }

      // Atualiza os dados do agricultor
      farmer.document = document;
      farmer.name = name;
      farmer.farmName = farmName;
      farmer.city = city;
      farmer.state = state;
      farmer.totalArea = Number(totalArea);
      farmer.agriculturalArea = Number(agriculturalArea);
      farmer.vegetationArea = Number(vegetationArea);
      farmer.crops = crops;

      // Salva o agricultor atualizado
      await farmerRepository.save(farmer);
      return res.status(200).json({
        message: "Agricultor atualizado com sucesso.",
        data: farmer,
      });
    } catch (error) {
      // Trata erros inesperados
      return res.status(500).json({
        message: "Erro ao atualizar agricultor.",
      });
    }
  }

  // Delete a farmer by ID
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const farmerRepository = getRepository(Farmer);

    try {
      const farmer = await farmerRepository.findOneOrFail({
        where: { id: Number(id) },
      });

      if (!farmer) {
        return res.status(400).json({ message: "Agricultor não encontrado." });
      }

      await farmerRepository.remove(farmer);
      return res
        .status(204)
        .json({ message: "Agricultor removido com sucesso." });
    } catch (error) {
      return res.status(404).json({ message: "Agricultor não encontrado." });
    }
  }
}
