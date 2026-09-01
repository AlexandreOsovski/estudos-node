/*
DESAFIO — process.nextTick() vs setImmediate()

Dentro do callback de leitura de um arquivo (fs.readFile), implemente
`processarResultado()` para imprimir, NESSA ordem:

  auditoria
  proximo-passo
  fallback

Regras:
  - "auditoria" deve rodar antes de QUALQUER timer/setImmediate agendado
    depois dela, mesmo que outras chamadas sejam feitas antes no código
  - "proximo-passo" deve rodar na fase 'check' do event loop
  - "fallback" deve rodar na fase 'timers'

Rode com: node 03-nexttick-vs-immediate.desafio.js
*/

const fs = require('fs');

function processarResultado() {
  // TODO: use process.nextTick, setImmediate e setTimeout na ordem certa
  process.nextTick(() => { console.log('auditoria') })
  setImmediate(() => { console.log('proximo-passo') })
  setTimeout(() => { console.log('fallback') }, 0)
}

fs.readFile(__filename, () => {
  processarResultado();
});
