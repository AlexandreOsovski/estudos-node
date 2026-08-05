// EXEMPLO — Microtasks vs Macrotasks
// Rode com: node 02-microtask-vs-macrotask.exemplo.js

console.log('A');

setTimeout(() => {
  console.log('B - macrotask (timer)');
  Promise.resolve().then(() => console.log('C - microtask gerada DENTRO da macrotask'));
}, 0);

Promise.resolve()
  .then(() => console.log('D - microtask 1'))
  .then(() => console.log('E - microtask 2 (encadeada)'));

console.log('F');

// Saída esperada:
// A
// F
// D - microtask 1
// E - microtask 2 (encadeada)
// B - macrotask (timer)
// C - microtask gerada DENTRO da macrotask
//
// Mesmo microtasks criadas DURANTE uma macrotask são drenadas por completo
// antes do loop seguir para a próxima macrotask.
