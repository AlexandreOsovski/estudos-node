

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
type ProdutoPublico = Pick<Produto, 'id' | 'nome' | 'preco'>

// TODO 3
type ProdutoSemCusto = Omit<Produto, 'custoInterno'>;

// TODO 4
type Categoria = Record<'eletronico' | 'livro' | 'roupa', number>;
type EstoquePorCategoria = Categoria;

function criarProduto() {
  return { id: 1, nome: 'Mouse', preco: 50, custoInterno: 20 };
}
// TODO 5
type ProdutoCriado = ReturnType<typeof criarProduto>;

interface RegistrarVenda {
  produtoId: number,
  quantidade: number,
  cliente: string
}

function registrarVenda(props: RegistrarVenda) {
  console.log(`Venda registrada: produto ${props.produtoId}, qtd ${props.quantidade}, cliente ${props.cliente}`);
}
// TODO 6
type ParametrosVenda = Parameters<typeof registrarVenda>;
function registrarVendaComLog(...args: ParametrosVenda) {
  console.log(`inicio: ${new Date(Date.now())} -> DADOS DE LOG`);

  return registrarVenda(...args);
}

const patch: AtualizarProduto = { nome: 'Novo nome' } as AtualizarProduto;
const publico: ProdutoPublico = { id: 1, nome: 'Mouse', preco: 50 } as ProdutoPublico;
const semCusto: ProdutoSemCusto = { id: 1, nome: 'Mouse', preco: 50 } as ProdutoSemCusto;
const estoque: EstoquePorCategoria = { eletronico: 10, livro: 5, roupa: 20 } as EstoquePorCategoria;
const criado: ProdutoCriado = criarProduto() as ProdutoCriado;

console.log({ patch, publico, semCusto, estoque, criado });

const registraLog: RegistrarVenda = {
  produtoId: 1,
  quantidade: 2,
  cliente: 'Ana'
}
registrarVendaComLog(registraLog);

// Depois de implementar os TODOs, remova os `as ...` acima — se os tipos
// estiverem corretos, as atribuições devem compilar sem eles.
