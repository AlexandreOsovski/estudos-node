// EXEMPLO — Optional Chaining (?.) e Nullish Coalescing (??)
// Rode com: node 06-optional-chaining-nullish.exemplo.js

function obterCidade(usuario) {
  return usuario?.endereco?.cidade ?? 'Não informado';
}

console.log(obterCidade({ nome: 'Ana', endereco: { cidade: 'Curitiba' } }));
console.log(obterCidade({ nome: 'Bruno' }));
console.log(obterCidade(null));

const configuracao = { limite: 0, ativo: false, nome: '' };

console.log('Com || (ERRADO para valores "falsy" válidos):');
console.log('limite:', configuracao.limite || 10); // 10 -- ERRADO, 0 é válido!
console.log('ativo:', configuracao.ativo || true); // true -- ERRADO, false é válido!

console.log('Com ?? (CORRETO — só cai no default se for null ou undefined):');
console.log('limite:', configuracao.limite ?? 10); // 0 -- CORRETO
console.log('ativo:', configuracao.ativo ?? true); // false -- CORRETO

// Saída esperada:
// Curitiba
// Não informado
// Não informado
// Com || (ERRADO para valores "falsy" válidos):
// limite: 10
// ativo: true
// Com ?? (CORRETO — só cai no default se for null ou undefined):
// limite: 0
// ativo: false
