// EXEMPLO — Cache Aside com Redis
// npm install ioredis
// Rode com: npx tsx 03-cache-aside-redis.exemplo.ts
// (requer um Redis rodando em localhost:6379 — ex: docker run -p 6379:6379 redis:7-alpine)

export interface Produto {
  id: number;
  nome: string;
  preco: number;
}

// Interface mínima de cache — permite injetar um Redis real (produção)
// ou um fake em memória (testes), sem que a lógica de negócio saiba a
// diferença. É Dependency Inversion (seção 8) aplicado ao cache.
export interface CacheClient {
  get(chave: string): Promise<string | null>;
  set(chave: string, valor: string, ttlSegundos: number): Promise<void>;
  del(chave: string): Promise<void>;
}

export async function buscarProdutoNoBanco(id: number): Promise<Produto> {
  console.log(`[BANCO] Consultando produto ${id}... (operação lenta)`);
  await new Promise((r) => setTimeout(r, 300));
  return { id, nome: 'Teclado Mecânico', preco: 350 };
}

export const TTL_SEGUNDOS = 60;

export async function buscarProdutoComCache(id: number, cache: CacheClient): Promise<Produto> {
  const chave = `produto:${id}`;
  const emCache = await cache.get(chave);
  if (emCache) {
    console.log('[CACHE] HIT');
    return JSON.parse(emCache);
  }
  console.log('[CACHE] MISS');
  const produto = await buscarProdutoNoBanco(id);
  await cache.set(chave, JSON.stringify(produto), TTL_SEGUNDOS);
  return produto;
}

export async function atualizarPrecoProduto(id: number, novoPreco: number, cache: CacheClient) {
  await cache.del(`produto:${id}`);
  console.log(`[CACHE] Chave produto:${id} invalidada`);
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

  await buscarProdutoComCache(1, cache);
  await buscarProdutoComCache(1, cache);
  await atualizarPrecoProduto(1, 400, cache);
  await buscarProdutoComCache(1, cache);
  process.exit(0);
}

if (require.main === module) {
  main();
}
