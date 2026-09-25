// process.nextTick(() => { console.log('1 - process.nextTick()') }); //executou 2
// console.log('2 - console.log()'); //executou 1
// Promise.resolve().then(() => { console.log('3 - Promise.resolve().then()') }); // executou 3

// setImmediate(() => {console.log('4 - setImmediate()')}) //executou 4
// setTimeout(() => { console.log('5 - setTimeout()') }, 0); //executou 5
// console.log('6 - console.log()') // executa antes de tudo

// setImmediate(() => {
//   Promise.resolve().then(() => { console.log('8 - setImmediate -> Promise.resolve().then()') });
//   console.log('7 - setImmediate -> console.log()');
// })

// setTimeout(() => { console.log('9 - setTimeout()') }, 0);

// Promise.resolve().catch(() => { console.log('10 - Promise.resolve.catch()') });
// Promise.resolve().finally(() => { console.log('11 - Promise.resolve.finally()') });

// let contador = 0;

// const meuIntervalo = setInterval(() => {
//   contador++;
//   console.log(`setInterval() => Execução número: ${contador}`);

//   if (contador === 2) {
//     clearInterval(meuIntervalo);
//     console.log("setInterval() => Parou após 2 execuções!");
//   }
// }, 1000);

// console.log('==========================================================')
// console.log("1 - console.log() síncrono");

// setTimeout(() => {
//   console.log("5 - setTimeout() de 0ms");
// }, 0);

// setInterval(() => {
//   console.log("6 - setInterval()");
//   clearInterval(this);
// }, 0);

// setImmediate(() => {
//   console.log("7 - setImmediate() simples");
// });

// setImmediate(() => {
//   console.log("8 - setImmediate() pai");

//   Promise.resolve().then(() => {
//     console.log("9 - promise.then() de DENTRO do setImmediate()");
//   });
// });

// Promise.resolve().then(() => {
//   console.log("3 - promise.then() global");
// });

// Promise.resolve().finally(() => {
//   console.log("4 - promise.finally() global");
// });

// process.nextTick(() => {
//   console.log("2 - process.nextTick()");
// });


// function validaTwoPointer(s, inicio = 0, fim = null) {
//   const stringSplit = s.toUpperCase().replaceAll(' ', '').split('');

//   if (fim === null) {
//     fim = stringSplit.length - 1;
//   }

//   if (inicio >= fim) {
//     return true;
//   }

//   if (stringSplit[inicio] !== stringSplit[fim]) {
//     return false;
//   }

//   return validaTwoPointer(stringSplit.join(''), inicio + 1, fim - 1);
// }

// console.log(validaTwoPointer('race a car'));

// function twoSumRecursive(n:number[], target: number, inicio: number = 0, fim: number = n.length - 1): any {
// const aaaa = n.sort((a, b) => a - b);
//   if (fim <= inicio) {
//     return null;
//   }

//   const soma = aaaa[inicio] + aaaa[fim];
//   if (soma === target) {
//     return [inicio + 1, fim + 1];
//   }

//   if (soma > target) {
//     return twoSumRecursive(aaaa, target, inicio, fim - 1);
//   }

//   return twoSumRecursive(aaaa, target, inicio + 1, fim);
// }
// console.log('recursive',twoSumRecursive([-1, 0, 3, 5, 9, -5, -9, -1, 10], 14));

// function twoSumWhileTrue(n: number[], target: number) {
//   const aaaa = n.sort((a, b) => a - b);
//   var inicio = 0
//   var fim = n.length - 1;

//   while (inicio < fim) {
//     const sum = aaaa[inicio] + aaaa[fim];

//     if (sum === target) {
//       return [inicio + 1, fim + 1];
//     }

//     if (sum < target) {
//       inicio++;
//     } else {
//       fim--;
//     }
//   }
// }

// console.log('while true', twoSumWhileTrue([-1, 0, 3, 5, 9, -5, -9, -1, 10], 14))

// function twoSumRecursiveVersionTwo(n: number[], target: number, inicio: number = 0, fim: number = n.length - 1) {
//   const aaaa = n.sort((a, b) => a - b);
//   if (fim <= inicio) {
//     return null;
//   }

//   const soma = aaaa[inicio] + aaaa[fim];
//   if (soma === target) {
//     return [inicio + 1, fim + 1];
//   }

//   if (soma > target) {
//     return twoSumRecursiveVersionTwo(aaaa, target, inicio, fim - 1);
//   }
//   return twoSumRecursiveVersionTwo(aaaa, target, inicio + 1, fim);

// }

// console.log('twoSumRecursiveVersionTwo', twoSumRecursiveVersionTwo([-1, 0, 3, 5, 9, -5, -9, -1, 10], 14));


// function recursive(nu: number[], target: number, inicio: number = 0, fim: number = nu.length - 1) {
//   const orderNumbers = nu.sort((a, b) => a - b);

//   if (fim <= inicio) {
//     return null;
//   }

//   const soma = orderNumbers[inicio] + orderNumbers[fim];
//   if (soma == target) {
//     return [inicio + 1, fim + 1];
//   }

//   if (soma > target) {
//     return recursive(orderNumbers, target, inicio, fim - 1);
//   }
//   return recursive(orderNumbers, target, inicio + 1, fim);
// }

// console.log('recursive', recursive([-1, 2, 3, 4, 5, -5, 10, -2, -1], 14));


//FACTORY FUNCTION COM CLOSURES
function Banco(valorInicial: number) {
  let valorLet = valorInicial; // acessivel ao bloco como um todo {}
  var valorVar = valorInicial;

  return {
    depositar(vlr: number) {
      let valorDepositado = (valorLet += vlr);// acessivel apenas ao bloco como um todo {}

      if (valorDepositado <= 0) {
        let retornoValorZero = 0; // só vai ser acessivel aqui, no bloco em que foi declarado;
        return retornoValorZero;
      }
      //aqui eu n consigo acessar o retornoValorZero pois ele foi declarado dentro do IF superior
      return valorDepositado;
    },
    sacar(vlr: number) {
      var valorSacado = (valorVar -= vlr); // nao é limitado pelo bloco igual ao let, ele é limitado pela funcao onde foi declarado;
      if (valorSacado <= 0) {
        var aaaaaa = valorSacado ?? 0;
      }
      return aaaaaa = valorSacado;
    },
    consultar() {
      return valorLet;
    }
  }
}
var banquinho = Banco(10);
console.log(banquinho.sacar(5)); //retorna 5
console.log(banquinho.depositar(5)); // retorna 10
console.log(banquinho.depositar(10)); // retorna 20
console.log(banquinho.consultar()); //retorna 20


function pegarPropriedade<Type, Key extends keyof Type>(obj: Type, chave: Key): Type[Key] {
  return obj[chave];
}

const usuario = { nome: 'Ana', idade: 30 };
const nomeTipado = pegarPropriedade(usuario, 'sexo');
console.log(nomeTipado);
