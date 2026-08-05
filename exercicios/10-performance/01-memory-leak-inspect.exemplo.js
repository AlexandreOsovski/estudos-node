// EXEMPLO — node --inspect + Chrome DevTools: heap snapshot e memory leaks
// Rode com: node --inspect 01-memory-leak-inspect.exemplo.js

// Memory leak PROPOSITAL: array que cresce indefinidamente, referenciado
// por um closure de setInterval que nunca para.
const cacheSemLimite = [];

setInterval(() => {
  cacheSemLimite.push({ dados: new Array(10000).fill('vazando memória') });
  console.log('Itens no cache:', cacheSemLimite.length);
}, 100);

// Passo a passo para investigar:
// 1. Rode com node --inspect — o terminal mostra uma URL tipo chrome://inspect
// 2. Abra o Chrome, acesse chrome://inspect, clique em "inspect" sob o processo
// 3. Na aba Memory do DevTools, clique em "Take heap snapshot"
// 4. Espere alguns segundos, tire um SEGUNDO snapshot
// 5. Compare os dois com o filtro "Comparison" — objetos que só crescem
//    entre snapshots (nunca coletados pelo GC) são candidatos a memory leak.
