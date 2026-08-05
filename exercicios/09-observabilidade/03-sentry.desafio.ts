/*
DESAFIO — Monitoramento de erros com Sentry: middleware Express

Implemente um middleware de erro Express `sentryErrorHandler` que:
  1. Captura QUALQUER erro que chegue até ele com `Sentry.captureException`.
  2. Anexa como `extra` o método e a URL da requisição
     (`req.method`, `req.originalUrl`).
  3. Anexa como `tag` `rota: req.path`.
  4. Responde ao cliente com status 500 e `{ erro: 'Erro interno' }`
     (sem vazar detalhes internos do erro para o cliente).

Monte uma rota GET /pedidos/:id que lança um erro proposital quando
`:id === '0'`, e registre o middleware de erro por último na cadeia.

Rode com: npx ts-node 03-sentry.desafio.ts
Teste com: curl localhost:3000/pedidos/0
*/

import express, { Request, Response, NextFunction } from 'express';
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'https://exemplo@o000000.ingest.sentry.io/000000',
  environment: process.env.NODE_ENV ?? 'development',
});

const app = express();

app.get('/pedidos/:id', (req: Request, res: Response) => {
  if (req.params.id === '0') throw new Error('Pedido com id inválido');
  res.json({ id: req.params.id, status: 'ok' });
});

function sentryErrorHandler(erro: any, req: Request, res: Response, next: NextFunction) {
  // TODO
}

app.use(sentryErrorHandler);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
