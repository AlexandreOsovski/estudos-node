// EXEMPLO — Dicas práticas de performance: structuredClone + Set vs Array
// Rode com: node 03-performance-tips.exemplo.js

function clonarObjetoJunior(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function clonarObjetoPleno(obj) {
  return structuredClone(obj);
}

const original = { nome: 'Ana', criadoEm: new Date(), tags: new Set(['vip']) };

const clone1 = clonarObjetoJunior(original);
const clone2 = clonarObjetoPleno(original);

console.log('clone via JSON — criadoEm é Date?', clone1.criadoEm instanceof Date);
console.log('clone via structuredClone — criadoEm é Date?', clone2.criadoEm instanceof Date);
console.log('clone via JSON — tags é Set?', clone1.tags instanceof Set);
console.log('clone via structuredClone — tags é Set?', clone2.tags instanceof Set);

const idsPermitidosArray = Array.from({ length: 100000 }, (_, i) => i);
const idsPermitidosSet = new Set(idsPermitidosArray);

console.time('Array.includes (O(n) por busca)');
for (let i = 0; i < 10000; i++) {
  idsPermitidosArray.includes(99999);
}
console.timeEnd('Array.includes (O(n) por busca)');

console.time('Set.has (O(1) por busca)');
for (let i = 0; i < 10000; i++) {
  idsPermitidosSet.has(99999);
}
console.timeEnd('Set.has (O(1) por busca)');

// JSON.parse(JSON.stringify(obj)) "destrói" silenciosamente Date (vira
// string), Set/Map (viram {}), undefined (removido) e funções. Prefira
// structuredClone() nativo para clonagem profunda segura.
