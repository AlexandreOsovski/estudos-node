/*
DESAFIO — Hash de senha com bcrypt

Implemente:
  1. `validarForcaSenha(senha)`: retorna true se a senha tiver pelo menos
     8 caracteres E pelo menos 1 número. Caso contrário, false.
  2. `cadastrarSenha(senha)`: valida a força da senha (lança
     Error('Senha fraca') se inválida) e retorna o hash gerado com bcrypt
     (SALT_ROUNDS = 12).
  3. `autenticar(senhaDigitada, hashArmazenado)`: retorna true/false
     comparando a senha com o hash usando bcrypt.compare.

Rode com: npx ts-node 01-bcrypt.desafio.ts
*/

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

function validarForcaSenha(senha: string): boolean {
  // TODO
  return false;
}

async function cadastrarSenha(senha: string): Promise<string> {
  // TODO
  throw new Error('não implementado');
}

async function autenticar(senhaDigitada: string, hashArmazenado: string): Promise<boolean> {
  // TODO
  return false;
}

async function main() {
  const hash = await cadastrarSenha('MinhaSenh@123');
  console.log('Hash gerado:', hash);

  console.log('Senha correta confere?', await autenticar('MinhaSenh@123', hash));
  console.log('Senha errada confere?', await autenticar('outraSenha1', hash));

  try {
    await cadastrarSenha('fraca');
  } catch (erro: any) {
    console.log('Erro esperado:', erro.message);
  }
}

main();
