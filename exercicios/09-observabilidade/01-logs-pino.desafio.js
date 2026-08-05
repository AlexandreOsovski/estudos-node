/*
DESAFIO — Logs estruturados com pino: redact + child logger

Implemente um logger pino que:
  1. Usa `redact` para mascarar automaticamente os campos `senha` e
     `token` em QUALQUER log (mesmo aninhados, ex: `usuario.senha`).
  2. Cria um "child logger" com um `requestId` fixo (via
     `logger.child({...})`), simulando logs correlacionados de uma
     única requisição.

Use o child logger para logar:
  - info: um login bem-sucedido, incluindo
    `{ usuarioId: 42, senha: 'nao-deveria-aparecer' }`
    (a senha deve aparecer mascarada na saída, não em texto plano)
  - error: uma falha de pagamento, incluindo `{ pedidoId: 7, token: 'abc123' }`
    (o token deve aparecer mascarado)

Rode com: node 01-logs-pino.desafio.js
*/

const pino = require('pino');

// TODO: configure o logger com redact para 'senha' e 'token' (inclusive
// campos aninhados, ex: '*.senha')
const logger = pino({ level: 'info' });

// TODO: crie o child logger com requestId fixo
const logRequisicao = logger;

// TODO: logue os dois eventos descritos no enunciado
