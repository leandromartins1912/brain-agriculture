const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produtor = sequelize.define('Produtor', {
  cpfCnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isCpfCnpjValid: validateCpfCnpj
    }
  },
  nomeProdutor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomeFazenda: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  areaTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  areaAgricultavel: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isValidArea(value) {
        if (value + this.areaVegetacao > this.areaTotal) {
          throw new Error('A soma de área agricultável e vegetação não pode ser maior que a área total');
        }
      }
    }
  },
  areaVegetacao: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isValidArea(value) {
        if (value + this.areaAgricultavel > this.areaTotal) {
          throw new Error('A soma de área agricultável e vegetação não pode ser maior que a área total');
        }
      }
    }
  },
  culturasPlantadas: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  }
});

function validateCpfCnpj(value) {
  const CPF_LENGTH = 11;
  const cleanValue = value.replace(/\D/g, ''); 

  if (cleanValue.length !== CPF_LENGTH) {
    throw new Error('CPF deve ter 11 dígitos');
  }

  if (isAllDigitsEqual(cleanValue)) {
    throw new Error('CPF não pode ter todos os dígitos iguais');
  }

  const digito1 = calcularDigitoVerificador(cleanValue, 9);
  const digito2 = calcularDigitoVerificador(cleanValue, 10);

  if (digito1 !== parseInt(cleanValue.charAt(9)) || digito2 !== parseInt(cleanValue.charAt(10))) {
    throw new Error('CPF inválido');
  }
}

function isAllDigitsEqual(cpf) {
  return cpf.split('').every(digit => digit === cpf[0]);
}

function calcularDigitoVerificador(cpf, tamanho) {
  let soma = 0;
  for (let i = 0; i < tamanho; i++) {
    soma += parseInt(cpf.charAt(i)) * (tamanho + 1 - i);
  }
  const resto = 11 - (soma % 11);
  return resto >= 10 ? 0 : resto;
}

module.exports = Produtor;
