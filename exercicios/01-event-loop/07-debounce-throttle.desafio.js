/*
DESAFIO — Throttle com Trailing Edge

O `throttle` do exemplo (07-debounce-throttle.exemplo.js) ignora chamadas
feitas durante o período de bloqueio — ele NUNCA executa a última chamada
"perdida" nesse intervalo (comportamento leading-edge only).

Implemente `throttleComTrailing(fn, limiteMs)`:
  - executa imediatamente na primeira chamada (leading edge), igual ao throttle normal
  - se chegarem novas chamadas durante o bloqueio, guarda APENAS os argumentos
    da mais recente
  - ao final do intervalo de bloqueio, se houve alguma chamada "perdida",
    executa `fn` uma vez com os argumentos dessa última chamada (trailing edge)

Rode com: node 07-debounce-throttle.desafio.js
*/

function throttleComTrailing(fn, limiteMs) {
  // TODO
}

const registrar = throttleComTrailing(
  (msg) => console.log(`[registrado] ${msg} @ ${Date.now()}`),
  200
);

registrar('a'); // deve executar imediatamente (leading edge)
setTimeout(() => registrar('b'), 50); // deve ser ignorada, mas vira candidata a trailing
setTimeout(() => registrar('c'), 100); // deve ser ignorada, substitui 'b' como candidata a trailing
// esperado: 'c' deve executar por volta de 200ms (trailing edge), mesmo sem nova chamada depois
