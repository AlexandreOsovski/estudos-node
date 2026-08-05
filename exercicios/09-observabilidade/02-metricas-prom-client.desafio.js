/*
DESAFIO — Métricas com prom-client: Gauge

O exemplo desta seção usa Counter e Histogram. Implemente uma métrica do
tipo Gauge chamada `conexoes_ativas_websocket`, que:
  - incrementa em 1 quando `simularConexao()` é chamada
  - decrementa em 1 quando `simularDesconexao()` é chamada
  - nunca deve ficar negativa

Exponha um endpoint GET /metrics (Express) que retorna as métricas no
formato Prometheus, incluindo `conexoes_ativas_websocket`.

Simule 5 conexões e 2 desconexões antes de subir o servidor, e confirme
(acessando /metrics) que o valor da métrica é 3.

Rode com: node 02-metricas-prom-client.desafio.js
Depois: curl localhost:3000/metrics | grep conexoes_ativas
*/

const client = require('prom-client');
const express = require('express');

const registro = new client.Registry();

// TODO: crie o Gauge 'conexoes_ativas_websocket' registrado em `registro`

function simularConexao() {
  // TODO
}

function simularDesconexao() {
  // TODO
}

for (let i = 0; i < 5; i++) simularConexao();
simularDesconexao();
simularDesconexao();

const app = express();
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', registro.contentType);
  res.end(await registro.metrics());
});

app.listen(3000, () => console.log('Métricas disponíveis em /metrics'));
