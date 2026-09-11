/*
DESAFIO — Utility Types

Dada a interface `Produto` abaixo, use Utility Types (sem reescrever os
campos manualmente) para:

  1. Criar `AtualizarProduto`: todos os campos de Produto, porém opcionais
     (útil para um PATCH).
  2. Criar `ProdutoPublico`: apenas os campos `id`, `nome` e `preco`
     (esconde `custoInterno`).
  3. Criar `ProdutoSemCusto`: todos os campos MENOS `custoInterno`.
  4. Criar `EstoquePorCategoria`: um Record mapeando as categorias
     'eletronico' | 'livro' | 'roupa' para um number (quantidade em estoque).
  5. A partir da função `criarProduto` (já implementada), derive o tipo
     `ProdutoCriado` usando ReturnType — sem repetir os campos manualmente.
  6. A partir da função `registrarVenda`, derive o tipo `ParametrosVenda`
     usando Parameters, e implemente `registrarVendaComLog` que loga uma
     linha antes de chamar `registrarVenda` com os mesmos argumentos.

Rode com: npx ts-node 01-utility-types.desafio.ts
*/

interface Produto {
  id: number;
  nome: string;
  preco: number;
  custoInterno: number;
}

// TODO 1
type AtualizarProduto = Partial<Produto>;

// TODO 2
type ProdutoPublico = Omit<Produto, 'custoInterno'>

// TODO 3
type ProdutoSemCusto = unknown;

// TODO 4
type Categoria = 'eletronico' | 'livro' | 'roupa';
type EstoquePorCategoria = unknown;

function criarProduto() {
  return { id: 1, nome: 'Mouse', preco: 50, custoInterno: 20 };
}
// TODO 5
type ProdutoCriado = unknown;

function registrarVenda(produtoId: number, quantidade: number, cliente: string) {
  console.log(`Venda registrada: produto ${produtoId}, qtd ${quantidade}, cliente ${cliente}`);
}
// TODO 6
type ParametrosVenda = unknown;
function registrarVendaComLog(...args: any[]) {
  // TODO
}

const patch: AtualizarProduto = { nome: 'Novo nome' } as AtualizarProduto;
const publico: ProdutoPublico = { id: 1, nome: 'Mouse', preco: 50 } as ProdutoPublico;
const semCusto: ProdutoSemCusto = { id: 1, nome: 'Mouse', preco: 50 } as ProdutoSemCusto;
const estoque: EstoquePorCategoria = { eletronico: 10, livro: 5, roupa: 20 } as EstoquePorCategoria;
const criado: ProdutoCriado = criarProduto() as ProdutoCriado;

console.log({ patch, publico, semCusto, estoque, criado });
registrarVendaComLog(1, 2, 'Ana');

// Depois de implementar os TODOs, remova os `as ...` acima — se os tipos
// estiverem corretos, as atribuições devem compilar sem eles.
