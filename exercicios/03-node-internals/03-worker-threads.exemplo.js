// EXEMPLO — Worker Threads
// Rode com: node 03-worker-threads.exemplo.js

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

if (isMainThread) {
  console.log('Thread principal iniciada. Disparando worker para Fibonacci(40)...');
  const inicio = Date.now();
  const worker = new Worker(__filename, { workerData: { n: 40 } });

  worker.on('message', (resultado) => {
    console.log(`Resultado do Worker: ${resultado} (levou ${Date.now() - inicio}ms)`);
  });
  worker.on('error', (erro) => console.error('Erro no worker:', erro));

  let contador = 0;
  const intervalo = setInterval(() => {
    console.log(`Main thread continua livre... tick ${++contador}`);
    if (contador === 3) clearInterval(intervalo);
  }, 50);
} else {
  const resultado = fibonacci(workerData.n);
  parentPort.postMessage(resultado);
}
