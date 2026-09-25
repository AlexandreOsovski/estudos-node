//TIPOS de SCOPES
//
// -> (1) Global Scope,
// -> (2) Function Scope,
// -> (3) Block Scope
// -> (4) Lexical Scope
//
// 1, 2 e 3 Define onde as variaveis vivem.
// 4 Define onde o JS deve buscar a variavel.

//GLOBAL SCOPE (acessivel em qualquer parte do código)
const nome = 'ALEXANDRE';
function getNome() {
  console.log(nome)
}
getNome();

//FUNCTION SCOPE (aqui a variavel nome é acessivel apenas dentro da função)
function nomeFunction() {
  const nome = 'ALEXANDRE';
  console.log(nome);
}
nomeFunction();

//BLOCK SCOPE (aqui a variavel nome é acessivel apenas dentro do bloco que foi definido)
function nomeBlock() { //um bloco é definido por chaves {}
  if (true) {
    let nome = 'ALEXANDRE';
    console.log(nome);
  }
  console.log(nome);
}
nomeBlock(); //caso o IF seja false, a variavel nome não será acessivel e retornará undefined


//LEXICAL SCOPE (aqui o JS busca a variavel no escopo pai)
function nomeLexical() {
  let nome = 'ALEXANDRE';
  let idade = 25;
  function getNome() {
    console.log(nome);
  }

  function getIdade() {
    console.log(idade);
  }

  getNome();
  getIdade();
}
nomeLexical();

console.log('_____________')
//SCOPE CHAIN (aqui o JS busca a variavel no escopo pai)

function scopeChain() {
  const a = 'raiz';

  function nivel1() {
    const b = 'nivel 1';

    function nivel2() {
      const c = 'nivel 2';

      function nivel3RetornoDados() {
        const retorno = 'Retorno dos dados';
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(retorno);
      }
      nivel3RetornoDados();
    }
    nivel2();
  }
  nivel1();
}
console.log(scopeChain())

console.log('_____________')
function criarPessoa() {
  const idade = 24;

  function mostrarIdade() {
    console.log(idade);
  }

  mostrarIdade();
}

criarPessoa();

console.log('_____________')
// function teste() {
//   if (true) {
//     let nomeLet = "Alexandre";
//     const idade = 24;
//   }
//
//   console.log(nomeLet);
//   console.log(idade);
// }
//
// teste();

console.log('_____________')
// function teste() {
//   if (true) {
//     var a = 10;
//     let b = 20;
//   }
//
//   console.log(a);
//   console.log(b);
// }
//
// teste();

console.log('_____________')

const valor = "A";

function externa() {
  const valor = "B";

  function interna() {
    const valor = "C";

    console.log(valor);
  }
  console.log(valor);
  interna();
}

externa();

console.log('_____________')

const nomeaaa = "global";

function mostrar() {
  console.log(nomeaaa);
}

function executar() {
  const nomeaaa = "local";

  mostrar();
}

executar();

console.log('_____________')
function criarMensagem() {
  const mensagem = "Olá, Alexandre!";

  return mensagem;
}

const mostrarMensagem = criarMensagem();

console.log(mostrarMensagem);

console.log('_____________')

function criarContador() {
  let valor = 0;

  return function() {
    valor++;
    return valor;
  }
}

const contador = criarContador();

console.log(contador()); // 1
console.log(contador()); // 2
console.log(contador()); // 3

console.log('_____________')

let valorAAA = 10;

function mostrarAAA() {
  console.log(valor);
}

function executarAAA() {
  let valorAAA = 20;

  return mostrarAAA;
}

const fn = executarAAA();

console.log(fn());

console.log('_____________')


// const x = "global";

function a() {
  var x = "a";

  function b() {
    var x = "b";

    function c() {
      console.log(x);
    }

    c();
  }

  b();
}

const resultado = a();

console.log(resultado);
