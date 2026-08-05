/*
DESAFIO — Microtasks vs Macrotasks

Implemente `executarPipeline()` para imprimir, NESSA ordem exata:

  inicio
  fim-sincrono
  microtask-1
  microtask-2
  macrotask

Requisitos:
  - "microtask-1" e "microtask-2" devem ser geradas por Promises ENCADEADAS (.then)
  - "macrotask" deve ser gerada por um setTimeout, mesmo com delay 0
  - Nenhuma das 3 pode aparecer antes do código síncrono terminar

Rode com: node 02-microtask-vs-macrotask.desafio.js e confira a ordem impressa.
*/

function executarPipeline() {
  console.log('inicio');

  // TODO: agende 'microtask-1' e 'microtask-2' como microtasks encadeadas (Promise.then)
  // TODO: agende 'macrotask' como macrotask (setTimeout)

  Promise.resolve()
    .then(() => {
      console.log('microtask-1');
      return Promise.resolve();
    })
    .then(() => {
      console.log('microtask-2');
    });

  setTimeout(() => {
    console.log('macrotask');
  }, 0);

  console.log('fim-sincrono');
}

executarPipeline();
