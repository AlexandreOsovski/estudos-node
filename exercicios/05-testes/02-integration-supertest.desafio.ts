/*
DESAFIO — Teste de integração com Supertest

Implemente `criarApp()` (Express) com a rota:
  GET /produtos/:id
    - se :id não for um número válido, responde 400 { erro: 'id inválido' }
    - se :id for um número mas não existir na lista `produtos` (abaixo),
      responde 404 { erro: 'produto não encontrado' }
    - se existir, responde 200 com o produto

Escreva testes de integração com Supertest cobrindo os 3 cenários.

Rode com: npx vitest run 02-integration-supertest.desafio.ts
*/

import request from 'supertest';
import express from 'express';
import { describe, it, expect } from 'vitest';

const produtos = [
  { id: 1, nome: 'Teclado', preco: 250 },
  { id: 2, nome: 'Monitor', preco: 900 },
];

function criarApp() {
  const app = express();
  // TODO: implemente a rota GET /produtos/:id
  return app;
}

describe('GET /produtos/:id (integração)', () => {
  const app = criarApp();

  it('retorna 200 e o produto quando o id existe', async () => {
    // TODO
  });

  it('retorna 404 quando o id não existe', async () => {
    // TODO
  });

  it('retorna 400 quando o id não é um número', async () => {
    // TODO
  });
});
