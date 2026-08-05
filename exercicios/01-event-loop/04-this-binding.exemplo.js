// EXEMPLO — Comportamento do `this`
// Rode com: node 04-this-binding.exemplo.js

class ContadorJunior {
  constructor() {
    this.valor = 0;
  }
  incrementar() {
    this.valor++;
  }
}

const contadorJunior = new ContadorJunior();
try {
  setTimeout(contadorJunior.incrementar, 0); // perde o `this`
} catch (e) {
  console.log('Erro esperado (jeito júnior):', e.message);
}

class ContadorPleno {
  valor = 0;
  incrementar = () => {
    this.valor++;
    console.log('Valor atual:', this.valor);
  };
}

const contadorPleno = new ContadorPleno();
setTimeout(contadorPleno.incrementar, 10); // funciona: arrow function como class field

// Saída esperada (após ~10ms):
// Valor atual: 1
//
// `function` declarations e métodos "normais" de classe têm `this` definido
// DINAMICAMENTE (depende de quem chama). Arrow functions não têm `this`
// próprio — capturam o `this` do escopo léxico onde foram definidas.
