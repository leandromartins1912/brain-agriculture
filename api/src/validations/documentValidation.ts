// src/validations/documentValidation.ts

export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  let remainder;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

export function validateCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  let sum = 0;
  let pos = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let remainder = sum % 11;
  if (remainder < 2) remainder = 0;
  else remainder = 11 - remainder;
  if (remainder !== parseInt(cnpj.charAt(12))) return false;

  sum = 0;
  pos = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * pos--;
    if (pos < 2) pos = 9;
  }
  remainder = sum % 11;
  if (remainder < 2) remainder = 0;
  else remainder = 11 - remainder;
  if (remainder !== parseInt(cnpj.charAt(13))) return false;

  return true;
}
