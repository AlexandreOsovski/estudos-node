// EXEMPLO — Monitoramento de erros com Sentry
// npm install @sentry/node
// Rode com: npx ts-node 03-sentry.exemplo.ts

import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'https://exemplo@o000000.ingest.sentry.io/000000',
  environment: process.env.NODE_ENV ?? 'development',
  tracesSampleRate: 0.2,
});

async function processarPedido(id: number) {
  if (id < 0) throw new Error(`ID de pedido inválido: ${id}`);
  return { id, status: 'processado' };
}

async function main() {
  try {
    await processarPedido(-5);
  } catch (erro) {
    Sentry.captureException(erro, {
      tags: { modulo: 'pedidos' },
      extra: { pedidoId: -5 },
    });
    console.log('Erro capturado e enviado ao Sentry (contexto: modulo=pedidos)');
  }
}

process.on('uncaughtException', (erro) => {
  Sentry.captureException(erro);
  console.error('Exceção não tratada capturada pelo Sentry:', erro.message);
  process.exit(1);
});

main();

// ARMADILHA COMUM: capturar a exceção com Sentry.captureException mas
// NÃO tratar adequadamente pode mascarar o problema para o usuário.
// Monitoramento de erro não substitui tratamento de erro — são
// complementares.
