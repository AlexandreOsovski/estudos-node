/*
DESAFIO — Design Patterns essenciais em Node.js

1. OBSERVER: implemente `EstoqueEmitter extends EventEmitter` e registre 3
   observers para o evento 'estoque:baixo', desacoplados entre si:
     - "[ALERTA] Estoque baixo do produto #<id>: <quantidade> unidades"
     - "[COMPRAS] Disparando pedido de reposição do produto #<id>"
     - "[MÉTRICAS] Incrementando contador de alertas de estoque"

2. DECORATOR: implemente `comRetry(fn, tentativas)`, um decorator que:
     - chama `fn`; se ela lançar um erro, tenta novamente até `tentativas`
       vezes no total
     - loga cada tentativa que falhar: "[RETRY] tentativa 1 falhou: <mensagem>"
     - se todas as tentativas falharem, relança o último erro
     - se alguma tentativa tiver sucesso, retorna o resultado normalmente

3. SINGLETON: no bloco de demonstração (dentro de `if (require.main === module)`),
   crie via fs.writeFileSync um módulo `contador-global.js` que exporta um
   objeto com uma propriedade `valor` inicializada uma única vez com
   Math.random(). Faça `require` desse módulo duas vezes e confirme que
   ambas as importações retornam a MESMA instância (mesmo `valor`).

Rode com: node 04-design-patterns.desafio.js
*/

const { EventEmitter } = require('events');

// --- TODO 1: Observer ---
class EstoqueEmitter extends EventEmitter {
  // TODO: nenhum método extra necessário aqui — registre os observers
  // no bloco de demonstração (ou onde preferir), este apenas precisa
  // continuar sendo um EventEmitter.
}

// --- TODO 2: Decorator ---
function comRetry(fn, tentativas) {
  // TODO
}

module.exports = { EstoqueEmitter, comRetry };

if (require.main === module) {
  const fs = require('fs');
  const path = require('path');

  const estoque = new EstoqueEmitter();
  // TODO: registre os 3 observers aqui, depois emita o evento
  // estoque.emit('estoque:baixo', { id: 55, quantidade: 3 });

  let chamadas = 0;
  function operacaoInstavel() {
    chamadas++;
    if (chamadas < 3) throw new Error(`falhou na tentativa ${chamadas}`);
    return 'sucesso!';
  }

  const operacaoComRetry = comRetry(operacaoInstavel, 5);
  console.log(operacaoComRetry());

  // --- TODO 3: Singleton ---
  const contadorModulo = path.join(__dirname, 'contador-global.js');
  // crie o módulo com fs.writeFileSync e faça os dois requires para comparar
}
