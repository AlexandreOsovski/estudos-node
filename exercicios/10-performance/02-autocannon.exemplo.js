// EXEMPLO — Teste de carga simples com autocannon
// npm install express
// npm install -g autocannon
// Rode com: node 02-autocannon.exemplo.js
// Em outro terminal: autocannon -c 50 -d 10 http://localhost:3000/produtos

const express = require('express');
const app = express();

app.get('/produtos', (req, res) => {
  res.json([{ id: 1, nome: 'Teclado' }]);
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

// -c 50: 50 conexões simultâneas | -d 10: por 10 segundos
// Olhe sempre para o p97.5/p99 (percentis altos), não só a média — são
// eles que representam a experiência dos usuários "de sorte azarada"
// (ex: uma requisição que coincide com uma pausa do Garbage Collector).
