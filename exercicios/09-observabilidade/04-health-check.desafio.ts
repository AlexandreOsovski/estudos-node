/*
DESAFIO — Health Check com timeout por dependência

O exemplo verifica banco e Redis sequencialmente, sem limite de tempo —
se uma dependência travar (nunca responder), a rota /health também
trava, o que é perigoso: o orquestrador (K8s/Docker) pode achar que a
API está travada e reiniciá-la desnecessariamente.

Implemente `verificarComTimeout(promessa, timeoutMs)`, uma função
genérica que corre uma Promise contra um timeout: se `promessa` não
resolver dentro de `timeoutMs`, a função deve resolver como 'falha' (sem
travar esperando indefinidamente).

Use essa função para checar banco e Redis com timeout de 2 segundos
cada, no endpoint GET /health (200 se tudo ok, 503 caso contrário, igual
ao exemplo).

Rode com: npx ts-node 04-health-check.desafio.ts
*/

import express from 'express';
import Redis from 'ioredis';
import { Pool } from 'pg';

const app = express();
const redis = new Redis();
const pool = new Pool();

async function verificarComTimeout(promessa: Promise<unknown>, timeoutMs: number): Promise<'ok' | 'falha'> {
  // TODO
  return 'falha';
}

app.get('/health', async (req, res) => {
  // TODO: use verificarComTimeout para checar pool.query('SELECT 1') e
  // redis.ping(), com timeout de 2000ms cada, e monte o status como no exemplo
});

app.listen(3000, () => console.log('Health check disponível em /health'));
