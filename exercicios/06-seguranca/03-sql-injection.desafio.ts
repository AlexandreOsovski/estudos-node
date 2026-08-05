/*
DESAFIO — SQL Injection: vulnerável vs parametrizada

`buscarProdutosPorNomeVulneravel` (abaixo) concatena o nome digitado
diretamente na query SQL — vulnerável a SQL Injection.

Implemente `buscarProdutosPorNomeSeguro(nomeDigitado)` usando query
PARAMETRIZADA (placeholder $1), fazendo uma busca parcial por nome
(equivalente a `LIKE '%nomeDigitado%'`), SEM concatenar o valor do
usuário na string SQL. A função deve retornar `{ query, params }`.

Este desafio não precisa de um Postgres real rodando — o foco é a STRING
da query e os parâmetros passados, não a execução de fato.

Rode com: npx ts-node 03-sql-injection.desafio.ts
*/

function buscarProdutosPorNomeVulneravel(nomeDigitado: string) {
  const query = `SELECT * FROM produtos WHERE nome LIKE '%${nomeDigitado}%'`;
  console.log('Query executada (vulnerável):', query);
  return query;
}

function buscarProdutosPorNomeSeguro(nomeDigitado: string): { query: string; params: string[] } {
  // TODO
  return { query: '', params: [] };
}

const entradaMaliciosa = "' OR '1'='1";

console.log('--- Vulnerável ---');
buscarProdutosPorNomeVulneravel(entradaMaliciosa);

console.log('--- Segura ---');
console.log(buscarProdutosPorNomeSeguro(entradaMaliciosa));
// esperado: a query deve conter apenas um placeholder ($1) — o valor
// malicioso deve aparecer SOMENTE no array `params`, nunca concatenado
// diretamente na string SQL.
