import { describe, it, expect } from '@aleosovski/muitto';
import { buscarProdutoComCache, atualizarPrecoProduto, CacheClient as CacheClientExemplo } from './03-cache-aside-redis.exemplo';
import { buscarPedidoComCache, cancelarPedido, CacheClient as CacheClientDesafio } from './03-cache-aside-redis.desafio';

// Fake em memória — implementa o mesmo contrato get/set/del de um Redis
// real, sem precisar de rede nem de um servidor rodando.
function criarCacheFake(): CacheClientExemplo & CacheClientDesafio & { store: Map<string, string> } {
  const store = new Map<string, string>();
  return {
    store,
    async get(chave) {
      return store.has(chave) ? store.get(chave)! : null;
    },
    async set(chave, valor) {
      store.set(chave, valor);
    },
    async del(chave) {
      store.delete(chave);
    },
  };
}

describe('Cache Aside com Redis (exemplo)', () => {
  it('MISS na primeira busca, popula o cache', async () => {
    const cache = criarCacheFake();
    const produto = await buscarProdutoComCache(1, cache);

    expect(produto.id).toBe(1);
    expect(cache.store.get('produto:1')).toBe(JSON.stringify(produto));
  });

  it('HIT na segunda busca — lê do cache, não recalcula', async () => {
    const cache = criarCacheFake();
    // Pré-popula o cache com um valor "adulterado": se a segunda leitura
    // devolver EXATAMENTE esse valor, prova que veio do cache (não de
    // buscarProdutoNoBanco, que sempre devolve "Teclado Mecânico").
    await cache.set('produto:1', JSON.stringify({ id: 1, nome: 'Valor em cache', preco: 1 }), 60);

    const produto = await buscarProdutoComCache(1, cache);

    expect(produto).toEqual({ id: 1, nome: 'Valor em cache', preco: 1 });
  });

  it('atualizarPrecoProduto invalida a chave', async () => {
    const cache = criarCacheFake();
    await buscarProdutoComCache(1, cache);
    expect(cache.store.has('produto:1')).toBeTruthy();

    await atualizarPrecoProduto(1, 400, cache);

    expect(cache.store.has('produto:1')).toBeFalsy();
  });
});

describe('Cache Aside com Redis (desafio)', () => {
  it('MISS na primeira busca, popula o cache', async () => {
    const cache = criarCacheFake();
    const pedido = await buscarPedidoComCache(1, cache);

    expect(pedido.id).toBe(1);
    expect(cache.store.get('pedido:1')).toBe(JSON.stringify(pedido));
  });

  it('HIT na segunda busca — lê do cache, não recalcula', async () => {
    const cache = criarCacheFake();
    await cache.set('pedido:1', JSON.stringify({ id: 1, status: 'valor em cache' }), 30);

    const pedido = await buscarPedidoComCache(1, cache);

    expect(pedido).toEqual({ id: 1, status: 'valor em cache' });
  });

  it('cancelarPedido invalida a chave', async () => {
    const cache = criarCacheFake();
    await buscarPedidoComCache(1, cache);
    expect(cache.store.has('pedido:1')).toBeTruthy();

    await cancelarPedido(1, cache);

    expect(cache.store.has('pedido:1')).toBeFalsy();
  });
});
