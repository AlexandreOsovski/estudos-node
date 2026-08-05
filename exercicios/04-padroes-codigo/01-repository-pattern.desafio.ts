/*
DESAFIO — Repository Pattern

Implemente a interface `ProdutoRepository` com os métodos:
  - buscarPorId(id: number): Promise<Produto | null>
  - listarComEstoqueBaixo(limiteEstoque: number): Promise<Produto[]>
  - criar(dados: Omit<Produto, 'id'>): Promise<Produto>

Implemente `ProdutoRepositoryEmMemoria` (guarda os produtos em um array).

Implemente `ProdutoService`, que recebe um `ProdutoRepository` no
construtor, com o método `cadastrarProduto(nome, preco, estoque)` que:
  - lança erro se preco <= 0
  - lança erro se estoque < 0
  - delega a persistência para o repositório

Rode com: npx ts-node 01-repository-pattern.desafio.ts
*/

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

export interface ProdutoRepository {
  // TODO
}

export class ProdutoRepositoryEmMemoria implements ProdutoRepository {
  // TODO
}

export class ProdutoService {
  constructor(private repo: ProdutoRepository) {}

  async cadastrarProduto(nome: string, preco: number, estoque: number): Promise<Produto> {
    // TODO
    throw new Error('não implementado');
  }
}

async function main() {
  const service = new ProdutoService(new ProdutoRepositoryEmMemoria());
  const produto = await service.cadastrarProduto('Teclado', 250, 10);
  console.log(produto);

  try {
    await service.cadastrarProduto('Produto inválido', -10, 5);
  } catch (erro: any) {
    console.log('Erro esperado:', erro.message);
  }
}

if (require.main === module) {
  main();
}
