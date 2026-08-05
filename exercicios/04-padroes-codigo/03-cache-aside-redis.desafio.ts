/*
DESAFIO — Cache Aside com Redis

Implemente, seguindo o padrão Cache-Aside:

  1. `buscarPedidoComCache(id, cache)`: verifica o cache primeiro (chave
     `pedido:{id}`). HIT -> retorna do cache. MISS -> busca em
     `buscarPedidoNoBanco` (já implementada, simula lentidão), salva no
     cache com TTL de 30 segundos, e retorna o valor.
  2. `cancelarPedido(id, cache)`: simula a atualização do status "no banco" e
     DEVE invalidar (deletar) a chave de cache correspondente, para não
     servir dado desatualizado na próxima leitura.

Logue "[CACHE] HIT" / "[CACHE] MISS" / "[CACHE] invalidado" para
conseguir visualizar o comportamento.

`cache` é injetado (interface `CacheClient`, já definida abaixo) — em
produção é um Redis real, nos testes é um fake em memória.

Rode com: npx tsx 03-cache-aside-redis.desafio.ts
(requer um Redis rodando em localhost:6379 — ex: docker run -p 6379:6379 redis:7-alpine)
*/

export interface Pedido {
  id: number;
  status: string;
}

export interface CacheClient {
  get(chave: string): Promise<string | null>;
  set(chave: string, valor: string, ttlSegundos: number): Promise<void>;
  del(chave: string): Promise<void>;
}

export async function buscarPedidoNoBanco(id: number): Promise<Pedido> {
  console.log(`[BANCO] Consultando pedido ${id}... (operação lenta)`);
  await new Promise((r) => setTimeout(r, 300));
  return { id, status: 'processando' };
}

export async function buscarPedidoComCache(id: number, cache: CacheClient): Promise<Pedido> {
  // TODO
  throw new Error('não implementado');
}

export async function cancelarPedido(id: number, cache: CacheClient): Promise<void> {
  // TODO
}

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Redis = require('ioredis');
  const redisClient = new Redis();
  const cache: CacheClient = {
    get: (chave) => redisClient.get(chave),
    set: (chave, valor, ttl) => redisClient.set(chave, valor, 'EX', ttl),
    del: (chave) => redisClient.del(chave),
  };

  await buscarPedidoComCache(1, cache);
  await buscarPedidoComCache(1, cache);
  await cancelarPedido(1, cache);
  await buscarPedidoComCache(1, cache);
  process.exit(0);
}

if (require.main === module) {
  main();
}
