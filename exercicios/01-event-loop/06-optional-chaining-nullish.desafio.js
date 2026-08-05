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

function obterPrecoFinal(pedido) {
  // TODO
}

console.log(obterPrecoFinal({ valor: 100, pagamento: { desconto: 20 } })); // 80
console.log(obterPrecoFinal({ valor: 100, pagamento: { desconto: 0 } })); // 100
console.log(obterPrecoFinal({ valor: 100 })); // 100
console.log(obterPrecoFinal(null)); // 0
