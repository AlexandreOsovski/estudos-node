/*
DESAFIO — Memory Leak: corrigindo com um cache de tamanho limitado

O código abaixo tem um memory leak proposital: um array que cresce
indefinidamente, referenciado por um closure de setInterval que nunca
para (veja 01-memory-leak-inspect.exemplo.js).

Implemente `criarCacheComLimite(tamanhoMaximo)`, que retorna um objeto
`{ adicionar(item), tamanho() }` cujo array interno NUNCA ultrapassa
`tamanhoMaximo` itens — ao adicionar um novo item quando já está cheio,
o item MAIS ANTIGO deve ser descartado (comportamento tipo fila/FIFO).

Substitua o uso de `cacheSemLimite` abaixo por esse cache limitado, e
rode com --inspect para confirmar (via Chrome DevTools > Memory) que a
memória do processo se estabiliza, em vez de crescer indefinidamente.

Rode com: node --inspect 01-memory-leak-inspect.desafio.js
(deixe rodando por alguns segundos e tire 2 heap snapshots para comparar)
*/

function criarCacheComLimite(tamanhoMaximo) {
  // TODO
}

const cache = criarCacheComLimite(50);

setInterval(() => {
  cache.adicionar({ dados: new Array(10000).fill('não deveria vazar memória') });
  console.log('Itens no cache:', cache.tamanho());
}, 100);
