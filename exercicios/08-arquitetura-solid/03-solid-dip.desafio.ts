/*
DESAFIO — Dependency Inversion Principle

Implemente a interface `ProcessadorDePagamento` com o método
`processar(valor: number): Promise<string>` (retorna um id de transação
fictício, ex: uma string aleatória).

Crie duas implementações: `ProcessadorCartao` e `ProcessadorPix`, cada
uma logando o "processamento" de forma diferente.

Implemente `CheckoutService`, que recebe um `ProcessadorDePagamento` via
construtor (NÃO deve instanciar nenhuma implementação concreta
internamente) e expõe `finalizarCompra(valor: number): Promise<string>`.

Rode com: npx ts-node 03-solid-dip.desafio.ts
*/

export interface ProcessadorDePagamento {
  processar(valor: number): Promise<string>;
}

// TODO: implemente ProcessadorCartao e ProcessadorPix
export class ProcessadorCartao implements ProcessadorDePagamento {
  async processar(valor: number): Promise<string> {
    // TODO
    throw new Error('não implementado');
  }
}

export class ProcessadorPix implements ProcessadorDePagamento {
  async processar(valor: number): Promise<string> {
    // TODO
    throw new Error('não implementado');
  }
}

export class CheckoutService {
  // TODO: injete o ProcessadorDePagamento via construtor

  async finalizarCompra(valor: number): Promise<string> {
    // TODO
    throw new Error('não implementado');
  }
}

async function main() {
  const checkoutCartao = new CheckoutService(new ProcessadorCartao());
  const checkoutPix = new CheckoutService(new ProcessadorPix());
  console.log(await checkoutCartao.finalizarCompra(150));
  console.log(await checkoutPix.finalizarCompra(150));
}

if (require.main === module) {
  main();
}
