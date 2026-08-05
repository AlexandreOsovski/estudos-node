// EXEMPLO — Logs estruturados com pino
// npm install pino
// Rode com: node 01-logs-pino.exemplo.js

const pino = require('pino');
const logger = pino({ level: 'info' });

logger.info({ usuarioId: 42, acao: 'login' }, 'Usuário fez login');
logger.warn({ pedidoId: 101, tentativas: 3 }, 'Retentativa de processamento de pedido');
logger.error({ err: new Error('Falha ao conectar no banco'), pedidoId: 101 }, 'Erro ao processar pedido');

// ARMADILHA COMUM: logar dados sensíveis (senha, token, número de
// cartão) em texto estruturado é ainda pior que em console.log, porque
// esses logs geralmente são persistidos e replicados em ferramentas de
// terceiros. Sempre mascare/omita campos sensíveis (pino suporta
// `redact` para isso automaticamente).
