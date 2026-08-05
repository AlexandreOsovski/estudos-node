/*
DESAFIO — Closures (Function Factory)

Implemente `criarLimitadorDeTentativas(maximo)`, que retorna um objeto com:

  - tentar(): retorna true se ainda há tentativas disponíveis (e consome uma);
              retorna false se o limite já foi atingido
  - tentativasRestantes(): retorna quantas tentativas ainda restam

O estado (quantas tentativas já foram usadas) deve ficar ENCAPSULADO via
closure — não pode existir como propriedade pública do objeto retornado.

Rode com: node 05-closures.desafio.js e confira se a saída bate com os
comentários ao lado de cada console.log.
*/

function criarLimitadorDeTentativas(maximo) {
  // TODO
}

const limitador = criarLimitadorDeTentativas(3);
console.log(limitador.tentar()); // true
console.log(limitador.tentar()); // true
console.log(limitador.tentativasRestantes()); // 1
console.log(limitador.tentar()); // true
console.log(limitador.tentar()); // false (limite atingido)
console.log(limitador.tentativasRestantes()); // 0
