/*
DESAFIO — Optional Chaining + Nullish Coalescing

Implemente `obterPrecoFinal(pedido)` que:

  - acessa pedido?.pagamento?.desconto de forma segura (sem quebrar se
    `pedido` ou `pagamento` forem null/undefined)
  - se o desconto não existir (null/undefined), assume 0 como padrão
  - CUIDADO: um desconto igual a 0 é um valor de negócio VÁLIDO (sem desconto)
    — não pode ser substituído por outro valor por engano (armadilha do `||`)
  - retorna pedido.valor - desconto
  - se `pedido` for null/undefined, retorna 0

Rode com: node 06-optional-chaining-nullish.desafio.js
*/

const produto1 = { valor: 100, pagamento: { desconto: 20 } };
const produto2 = { valor: 100, pagamento: { desconto: 0 } }
const produto3 = { valor: 100 };

function obterPrecoFinal(pedido) {
  if (pedido == null) return 0;
  return (pedido?.pagamento?.desconto > 0 ) ? (pedido?.valor - pedido?.pagamento?.desconto) : pedido?.valor;
}

console.log(obterPrecoFinal(produto1)); // 80
console.log(obterPrecoFinal(produto2)); // 100
console.log(obterPrecoFinal(produto3)); // 100
console.log(obterPrecoFinal(null)); // 0
