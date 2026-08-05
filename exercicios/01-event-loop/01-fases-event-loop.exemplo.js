// EXEMPLO — Fases do Event Loop
// Rode com: node 01-fases-event-loop.exemplo.js

console.log('1 - início do script (síncrono)');

setTimeout(() => console.log('2 - setTimeout (fase timers)'), 0);

setImmediate(() => console.log('3 - setImmediate (fase check)'));

Promise.resolve().then(() => console.log('4 - Promise.then (microtask)'));

process.nextTick(() => console.log('5 - process.nextTick (microtask prioritária)'));

console.log('6 - fim do script (síncrono)');

// Saída esperada:
// 1 - início do script (síncrono)
// 6 - fim do script (síncrono)
// 5 - process.nextTick (microtask prioritária)
// 4 - Promise.then (microtask)
// 2 - setTimeout (fase timers)
// 3 - setImmediate (fase check)
//
// Entre CADA fase (e entre cada callback dentro de uma fase), o Node
// esvazia completamente a fila de microtasks antes de seguir em frente.
