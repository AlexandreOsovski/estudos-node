/*
DESAFIO — Teste unitário com Vitest mockando um repositório

Implemente `ProdutoService.obterPrecoComDesconto(id, percentual)`:
  - busca o produto via `this.repo.buscarPorId(id)`
  - se não existir, lança Error('Produto não encontrado')
  - retorna produto.preco * (1 - percentual / 100), arredondado para 2 casas

Depois, escreva os testes com Vitest (usando vi.fn() para mockar o
repositório) cobrindo:
  - retorna o preço com desconto corretamente quando o produto existe
  - lança erro quando o produto não existe
  - o mock do repositório foi chamado com o id correto

Rode com: npx vitest run 01-unit-vitest.desafio.ts
*/

import { describe, it, expect, vi } from 'vitest';

interface ProdutoRepository {
  buscarPorId(id: number): Promise<{ id: number; preco: number } | null>;
}

class ProdutoService {
  constructor(private repo: ProdutoRepository) {}

  async obterPrecoComDesconto(id: number, percentual: number): Promise<number> {
    // TODO
    throw new Error('não implementado');
  }
}

describe('ProdutoService', () => {
  it('retorna o preço com desconto quando o produto existe', async () => {
    // TODO: monte o repoMock com vi.fn(), instancie ProdutoService e valide
    // obterPrecoComDesconto(1, 10) para um produto de preco 200 -> 180
  });

  it('lança erro quando o produto não existe', async () => {
    // TODO
  });

  it('chama o repositório com o id correto', async () => {
    // TODO
  });
});
