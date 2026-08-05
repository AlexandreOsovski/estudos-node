/*
DESAFIO — Worker Threads

Implemente uma checagem de número primo "pesada" (força bruta, sem
otimizações — isso é intencional, para simular uma tarefa CPU-bound
custosa) rodando em uma Worker Thread, para o número 1000000033.

Enquanto o worker processa, a thread principal deve continuar livre,
logando um "tick" a cada 50ms (assim como no exemplo do Fibonacci), até o
worker responder com o resultado.

Rode com: node 03-worker-threads.desafio.js
*/

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function ehPrimo(n) {
  // TODO: implemente a checagem de primo por força bruta
}

if (isMainThread) {
  console.log('Thread principal iniciada. Verificando se 1000000033 é primo...');
  const inicio = Date.now();

  // TODO: crie o worker (new Worker(__filename, { workerData: { n: 1000000033 } }))
  // trate 'message' e 'error', e imprima o resultado + tempo decorrido

  let contador = 0;
  const intervalo = setInterval(() => {
    console.log(`Main thread continua livre... tick ${++contador}`);
    if (contador === 3) clearInterval(intervalo);
  }, 50);
} else {
  // TODO: rode ehPrimo(workerData.n) e envie o resultado de volta via parentPort.postMessage
}
