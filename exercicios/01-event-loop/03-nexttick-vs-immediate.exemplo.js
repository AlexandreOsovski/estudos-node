// EXEMPLO — process.nextTick() vs setImmediate()
// Rode com: node 03-nexttick-vs-immediate.exemplo.js

const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('1 - setTimeout'), 0);
  setImmediate(() => console.log('2 - setImmediate'));
  process.nextTick(() => console.log('3 - process.nextTick'));
});

// Saída esperada:
// 3 - process.nextTick
// 2 - setImmediate
// 1 - setTimeout
//
// Dentro de um callback de I/O, setImmediate() SEMPRE roda antes de
// setTimeout(fn, 0), porque a fase 'check' vem logo após 'poll', enquanto
// 'timers' só será revisitada na próxima volta completa do loop.
