/*
DESAFIO — Type Guards e Narrowing

1. Defina a union `FormaPagamento` com 3 variantes discriminadas por `tipo`:
     - { tipo: 'cartao'; numero: string; parcelas: number }
     - { tipo: 'pix'; chave: string }
     - { tipo: 'boleto'; linhaDigitavel: string; vencimento: string }

2. Implemente `calcularTaxa(pagamento: FormaPagamento): number` usando
   narrowing por `pagamento.tipo` (switch ou if), SEM usar `as` para forçar
   tipos:
     - cartao: 1.5 + 0.5 * parcelas
     - pix: 0
     - boleto: 3 (fixo)

3. Implemente duas classes de erro, `ErroPagamentoRecusado extends Error` e
   `ErroSaldoInsuficiente extends Error`, e a função
   `tratarErroPagamento(erro: unknown): string` que faz narrowing com
   `instanceof` e retorna uma mensagem amigável para cada caso, com um
   fallback para erro desconhecido.

Rode com: npx ts-node 03-type-guards-narrowing.desafio.ts
*/

type cartao = { tipo: 'cartao'; numero: string; parcelas: number };
type pix = { tipo: 'pix'; chave: string };
type boleto = { tipo: 'boleto'; linhaDigitavel: string; vencimento: string };

// TODO 1
type FormaPagamento = cartao | pix | boleto;

// TODO 2
function calcularTaxa(pagamento: FormaPagamento): number {
  let taxa: number;
  switch (pagamento.tipo) {
    case 'cartao':
      taxa = 1.5 + 0.5 * pagamento.parcelas;
    break;

    case 'pix':
      taxa = 0;
    break;

    case 'boleto':
      taxa = 3;
    break;
  }
  return taxa;
}

// TODO 3
function tratarErroPagamento(erro: unknown): string {
  if (erro instanceof ErroPagamentoRecusado) {
    return 'PAGAMENTO RECUSADO';
  }

  if (erro instanceof ErroSaldoInsuficiente) {
    return 'SALDO INSUFICIENTE';
  }

  return 'Erro desconhecido';
}

class ErroPagamentoRecusado extends Error {
}

class ErroSaldoInsuficiente extends Error {
}

console.log(calcularTaxa({ tipo: 'cartao', numero: '4111', parcelas: 3 } as any)); // 3.0
console.log(calcularTaxa({ tipo: 'pix', chave: 'ana@email.com' } as any)); // 0
console.log(calcularTaxa({ tipo: 'boleto', linhaDigitavel: '123', vencimento: '2026-08-10' } as any)); // 3

console.log(tratarErroPagamento(new Error('genérico')));
