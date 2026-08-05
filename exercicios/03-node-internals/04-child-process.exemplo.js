// EXEMPLO — Child Processes: exec, spawn, fork
// Rode com: node 04-child-process.exemplo.js
// (o worker-fork.js precisa existir na mesma pasta — veja abaixo)

const fs = require('fs');
const path = require('path');
const { exec, spawn, fork } = require('child_process');

exec('echo "Resultado via exec"', (erro, stdout) => {
  console.log('[exec]', stdout.trim());
});

const processoSpawn = spawn('node', ['-e', 'console.log("Resultado via spawn")']);
processoSpawn.stdout.on('data', (data) => {
  console.log('[spawn]', data.toString().trim());
});

const forkWorkerPath = path.join(__dirname, 'worker-fork.js');
fs.writeFileSync(
  forkWorkerPath,
  "process.on('message', (msg) => { process.send(`Processado: ${msg.toUpperCase()}`); });\n"
);

const filho = fork(forkWorkerPath);
filho.send('ola do processo pai');
filho.on('message', (resposta) => {
  console.log('[fork]', resposta);
  filho.kill();
});
