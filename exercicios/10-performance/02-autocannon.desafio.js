/*
DESAFIO — Teste de carga com autocannon: identificando bloqueio do Event Loop

A rota /relatorio abaixo faz um cálculo pesado de forma SÍNCRONA
(bloqueia o event loop inteiro enquanto calcula) — sob carga
concorrente, isso derruba a latência de TODAS as rotas, não só a de
/relatorio.

1. Suba o servidor (node 02-autocannon.desafio.js) e rode, em outro
   terminal:
     autocannon -c 50 -d 10 http://localhost:3000/relatorio
   Anote a latência p97.5/p99 — e tente também bater na rota /rapida
   AO MESMO TEMPO, em um terceiro terminal, para ver o quanto ela é
   afetada mesmo sem fazer nada pesado.

2. Refatore a rota /relatorio para NÃO bloquear o event loop, mantendo o
   resultado correto (dicas: mova o cálculo para uma Worker Thread — veja
   03-node-internals/03-worker-threads — ou quebre o loop em pedaços
   menores intercalados com setImmediate).

3. Rode o mesmo autocannon de novo e compare a latência antes/depois.

npm install express
npm install -g autocannon
Rode com: node 02-autocannon.desafio.js
*/

const express = require('express');
const app = express();

function calculoPesadoSincrono(iteracoes) {
  let soma = 0;
  for (let i = 0; i < iteracoes; i++) {
    soma += Math.sqrt(i);
  }
  return soma;
}

app.get('/relatorio', (req, res) => {
  // TODO: refatore para não bloquear o event loop (mantendo o resultado correto)
  const resultado = calculoPesadoSincrono(200_000_000);
  res.json({ resultado });
});

app.get('/rapida', (req, res) => {
  res.json({ ok: true });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
