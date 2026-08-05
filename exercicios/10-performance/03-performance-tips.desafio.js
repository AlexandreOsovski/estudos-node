/*
DESAFIO — Set em vez de Array.includes

Implemente `criarVerificadorDeBloqueio(emailsBloqueados)`, que recebe um
array de emails bloqueados e retorna uma função `estaBloqueado(email)`
com busca O(1) — NÃO pode usar Array.includes/Array.find internamente,
use uma estrutura de dados com hashing (Set ou Map).

Depois, meça com console.time/console.timeEnd a diferença de
performance entre:
  - chamar Array.prototype.includes diretamente 10.000 vezes, num array
    de 100.000 emails
  - chamar sua função `estaBloqueado` 10.000 vezes, para o mesmo cenário

Rode com: node 03-performance-tips.desafio.js
*/

function criarVerificadorDeBloqueio(emailsBloqueados) {
  // TODO
}

const emailsBloqueados = Array.from({ length: 100000 }, (_, i) => `usuario${i}@teste.com`);
const emailAlvo = 'usuario99999@teste.com';

console.time('Array.includes (O(n) por busca)');
for (let i = 0; i < 10000; i++) {
  emailsBloqueados.includes(emailAlvo);
}
console.timeEnd('Array.includes (O(n) por busca)');

const estaBloqueado = criarVerificadorDeBloqueio(emailsBloqueados);
console.time('estaBloqueado (deve ser O(1) por busca)');
for (let i = 0; i < 10000; i++) {
  estaBloqueado(emailAlvo);
}
console.timeEnd('estaBloqueado (deve ser O(1) por busca)');
