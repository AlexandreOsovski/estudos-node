// EXEMPLO — Buffers
// Rode com: node 02-buffers.exemplo.js

const buf1 = Buffer.from('Olá, Node!', 'utf8');
const buf2 = Buffer.alloc(10);
const buf3 = Buffer.from([72, 101, 108, 108, 111]);

console.log('buf1 (hex):', buf1.toString('hex'));
console.log('buf1 (base64):', buf1.toString('base64'));
console.log('buf1 (utf8):', buf1.toString('utf8'));
console.log('buf3 (utf8):', buf3.toString('utf8'));
console.log('buf2:', buf2);
console.log('tamanho de buf1 em bytes:', buf1.length);

console.log('"é".length (JS string):', 'é'.length);
console.log('Buffer.from("é").length:', Buffer.from('é').length);

// O clássico bug de "contador de caracteres errado com acentos" vem da
// confusão entre .length de string (unidades UTF-16) e .length de Buffer
// (bytes reais em UTF-8).
