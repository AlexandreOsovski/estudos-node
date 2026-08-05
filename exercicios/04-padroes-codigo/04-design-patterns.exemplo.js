// EXEMPLO — Design Patterns essenciais em Node.js (Observer, Decorator, Singleton)
// Rode com: node 04-design-patterns.exemplo.js

const { EventEmitter } = require('events');

// --- Observer: EventEmitter nativo ---
class PedidoEmitter extends EventEmitter {}

// --- Decorator: função wrapper pura ---
function comLog(fn) {
  return function (...args) {
    console.log(`[LOG] Chamando "${fn.name}" com args:`, args);
    const resultado = fn(...args);
    console.log(`[LOG] "${fn.name}" retornou:`, resultado);
    return resultado;
  };
}

function somar(a, b) {
  return a + b;
}

module.exports = { PedidoEmitter, comLog, somar };

if (require.main === module) {
  const fs = require('fs');
  const path = require('path');

  const pedidos = new PedidoEmitter();
  pedidos.on('pedido:criado', (pedido) => {
    console.log(`[EMAIL] Enviando confirmação para pedido #${pedido.id}`);
  });
  pedidos.on('pedido:criado', (pedido) => {
    console.log(`[ESTOQUE] Reservando itens do pedido #${pedido.id}`);
  });
  pedidos.on('pedido:criado', () => {
    console.log('[MÉTRICAS] Incrementando contador de pedidos');
  });
  pedidos.emit('pedido:criado', { id: 101, total: 250 });

  const somarComLog = comLog(somar);
  somarComLog(2, 3);

  // --- Singleton: module caching do Node ---
  const conexaoModulo = path.join(__dirname, 'conexao-banco.js');
  fs.writeFileSync(
    conexaoModulo,
    "console.log('Inicializando conexão com o banco (isso só deve rodar UMA vez)...');\nmodule.exports = { conexaoId: Math.random() };\n"
  );

  const conexaoA = require(conexaoModulo);
  const conexaoB = require(conexaoModulo);

  console.log('conexaoA === conexaoB?', conexaoA === conexaoB);
  console.log('Mesmo conexaoId?', conexaoA.conexaoId === conexaoB.conexaoId);
}
