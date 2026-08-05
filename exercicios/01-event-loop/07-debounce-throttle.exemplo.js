// EXEMPLO — Debounce e Throttle
// Rode com: node 07-debounce-throttle.exemplo.js

function debounce(fn, delayMs) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delayMs);
  };
}

function throttle(fn, limiteMs) {
  let podeExecutar = true;
  return function (...args) {
    if (!podeExecutar) return;
    fn.apply(this, args);
    podeExecutar = false;
    setTimeout(() => (podeExecutar = true), limiteMs);
  };
}

const buscarNoServidor = debounce((termo) => {
  console.log(`[DEBOUNCE] Buscando por: "${termo}"`);
}, 300);

const registrarScroll = throttle(() => {
  console.log(`[THROTTLE] Posição de scroll registrada em ${Date.now()}`);
}, 300);

['n', 'no', 'nod', 'node'].forEach((termo, i) => {
  setTimeout(() => buscarNoServidor(termo), i * 100);
});

for (let i = 0; i < 5; i++) {
  setTimeout(() => registrarScroll(), i * 100);
}

// Saída esperada (aproximada):
// [THROTTLE] Posição de scroll registrada em <ts1>
// [THROTTLE] Posição de scroll registrada em <ts1+300>
// [DEBOUNCE] Buscando por: "node"
//
// Debounce "atrasa e cancela" — só a última chamada dentro da janela
// sobrevive. Throttle "espaça" — garante execução periódica mesmo com
// chamadas contínuas.
