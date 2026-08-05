/*
DESAFIO — Fases do Event Loop

Você recebeu uma tarefa de "hidratar" um cache em 3 passos, cada um com uma
prioridade diferente de execução dentro do callback de I/O:

  1. "critico" -> deve rodar ANTES de qualquer timer ou setImmediate, mas
                  DEPOIS do código síncrono do callback atual
  2. "pos-io"  -> deve rodar logo após a fase poll (I/O) terminar, na fase check
  3. "timer"   -> deve rodar na fase timers do event loop

Implemente `hidratarCache()` usando as APIs corretas (process.nextTick,
setTimeout, setImmediate) para que, ao rodar dentro do callback de
fs.readFile, o console.log apareça EXATAMENTE nesta ordem:

  1 - critico
  2 - pos-io
  3 - timer

Rode com: node 01-fases-event-loop.desafio.js
*/

const fs = require('fs');

function hidratarCache() {
  // TODO: registre as 3 chamadas (critico, pos-io, timer) respeitando a ordem exigida.
  setTimeout(() => {
    console.log('timer');
  }, 0);

  setImmediate(() => {
    console.log('pos-io');
  });

  process.nextTick(() => {
    console.log('critico');
  });
}

fs.readFile(__filename, () => {
  hidratarCache();
});
