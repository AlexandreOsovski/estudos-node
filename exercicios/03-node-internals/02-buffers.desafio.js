/*
DESAFIO — Buffers

Implemente `truncarPorBytes(texto, maxBytes)` que trunca uma string para
caber em no máximo `maxBytes` bytes quando codificada em UTF-8 — SEM
cortar um caractere multi-byte pela metade (o que geraria caracteres
corrompidos, tipo "�", no resultado).

Dica: Buffer.from(texto, 'utf8').length te dá o tamanho em bytes. Um
Buffer pode ser fatiado (.subarray) e decodificado de volta com
.toString('utf8') — mas decodificar um corte no meio de um caractere
multi-byte também gera lixo. Pense em como detectar/evitar isso (dica:
Buffer.from(str).toString('utf8').length comparado ao length original
pode ajudar a validar o resultado).

Rode com: node 02-buffers.desafio.js
*/

function truncarPorBytes(texto, maxBytes) {
  // TODO
}

console.log(truncarPorBytes('Olá, Node!', 5)); // não deve conter caracteres quebrados
console.log(truncarPorBytes('café com leite', 6));
console.log(truncarPorBytes('abc', 10)); // 'abc' (menor que o limite, retorna igual)
console.log(Buffer.from(truncarPorBytes('café com leite', 6), 'utf8').length <= 6); // true
