// EXEMPLO — Health Check endpoint
// npm install express ioredis pg
// Rode com: npx ts-node 04-health-check.exemplo.ts

import express from 'express';
import Redis from 'ioredis';
import { Pool } from 'pg';

const app = express();
const redis = new Redis();
const pool = new Pool();

app.get('/health', async (req, res) => {
  const status = {
    api: 'ok',
    banco: 'desconhecido',
    redis: 'desconhecido',
  };

  try {
    await pool.query('SELECT 1');
    status.banco = 'ok';
  } catch {
    status.banco = 'falha';
  }

  try {
    await redis.ping();
    status.redis = 'ok';
  } catch {
    status.redis = 'falha';
  }

  const tudoOk = Object.values(status).every((s) => s === 'ok');
  res.status(tudoOk ? 200 : 503).json(status);
});

app.listen(3000, () => console.log('Health check disponível em /health'));

// Um health check que só checa `api: ok` sem checar as dependências
// reais dá falsos positivos perigosos — é isso que HEALTHCHECK do
// Dockerfile e os probes do Kubernetes consultam para decidir se devem
// reiniciar o container.
