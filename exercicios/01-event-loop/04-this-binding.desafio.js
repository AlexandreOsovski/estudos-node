/*
DESAFIO — this binding

A classe abaixo quebra quando o método é passado como referência (ex: para
setTimeout, addEventListener, Array.map). Rode o arquivo e veja o erro.

Corrija a classe `Contador` para que `setTimeout(contador.incrementar, 0)`
funcione corretamente, SEM alterar a linha do setTimeout no final do arquivo
(a correção deve estar dentro da classe).

Rode com: node 04-this-binding.desafio.js
*/

class Contador {
  valor = 0;

  constructor() {
    this.valor;
  }

  incrementar = () => {
    this.valor++;
    console.log('valor atual:', this.valor);
  }
}

// TODO: corrija a classe acima (não altere a linha abaixo)
const contador = new Contador();
setTimeout(contador.incrementar, 0); // hoje: TypeError — deve logar "valor atual: 1"
