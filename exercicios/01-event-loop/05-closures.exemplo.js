// EXEMPLO — Closures aplicados a problemas reais
// Rode com: node 05-closures.exemplo.js

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var i =', i), 10);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log('let i =', i), 20);
}

function criarContaBancaria(saldoInicial) {
  let saldo = saldoInicial;

  return {
    depositar(valor) {
      saldo += valor;
      return saldo;
    },
    sacar(valor) {
      if (valor > saldo) throw new Error('Saldo insuficiente');
      saldo -= valor;
      return saldo;
    },
    consultarSaldo() {
      return saldo;
    },
  };
}

const conta = criarContaBancaria(100);
console.log(conta.depositar(50));
console.log(conta.sacar(30));
console.log(conta.saldo); // undefined — saldo é privado, só acessível pelos métodos
console.log(conta.consultarSaldo());

// Saída esperada:
// 150
// 120
// undefined
// 120
// var i = 3
// var i = 3
// var i = 3
// let i = 0
// let i = 1
// let i = 2
//
// `var` é function-scoped: uma única variável `i` compartilhada por todas as
// iterações. `let` é block-scoped: um novo ambiente léxico a cada iteração.
