// EXEMPLO — Teste de integração com Supertest
// npm install -D supertest @types/supertest
// npm install express
// Rode com: npx vitest run 02-integration-supertest.exemplo.ts

import request from 'supertest';
import express from 'express';
import { describe, it, expect } from 'vitest';

function criarApp() {
  const app = express();
  app.use(express.json());

  app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ erro: 'nome e email são obrigatórios' });
    }
    return res.status(201).json({ id: 1, nome, email });
  });

  return app;
}

describe('POST /usuarios (integração)', () => {
  const app = criarApp();

  it('cria um usuário com dados válidos', async () => {
    const resposta = await request(app).post('/usuarios').send({ nome: 'Ana', email: 'ana@email.com' });
    expect(resposta.status).toBe(201);
    expect(resposta.body).toEqual({ id: 1, nome: 'Ana', email: 'ana@email.com' });
  });

  it('retorna 400 quando faltam dados', async () => {
    const resposta = await request(app).post('/usuarios').send({ nome: 'Ana' });
    expect(resposta.status).toBe(400);
    expect(resposta.body.erro).toContain('obrigatórios');
  });
});
