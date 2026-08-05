// EXEMPLO — Métricas básicas com prom-client (Counter + Histogram)
// npm install prom-client express
// Rode com: node 02-metricas-prom-client.exemplo.js

const client = require('prom-client');
const express = require('express');

const registro = new client.Registry();
client.collectDefaultMetrics({ register: registro });

const contadorRequisicoes = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de requisições HTTP recebidas',
  labelNames: ['metodo', 'rota', 'status'],
  registers: [registro],
});

const duracaoRequisicoes = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duração das requisições HTTP em segundos',
  labelNames: ['metodo', 'rota'],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5],
  registers: [registro],
});

const app = express();

app.use((req, res, next) => {
  const fimTimer = duracaoRequisicoes.startTimer({ metodo: req.method, rota: req.path });
  res.on('finish', () => {
    contadorRequisicoes.inc({ metodo: req.method, rota: req.path, status: res.statusCode });
    fimTimer();
  });
  next();
});

app.get('/produtos', (req, res) => res.json([{ id: 1, nome: 'Teclado' }]));

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', registro.contentType);
  res.end(await registro.metrics());
});

app.listen(3000, () => console.log('Métricas disponíveis em /metrics'));

// Um Histogram (não apenas uma média) é essencial porque médias escondem
// outliers — permite calcular percentis (p95, p99) que refletem a
// experiência real dos usuários mais afetados.
