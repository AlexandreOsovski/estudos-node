// EXEMPLO — Open/Closed Principle
// Rode com: npx ts-node 02-solid-ocp.exemplo.ts

export interface CalculadoraDeDesconto {
  calcular(valorOriginal: number): number;
}

export class DescontoNatal implements CalculadoraDeDesconto {
  calcular(valorOriginal: number): number {
    return valorOriginal * 0.9; // 10% off
  }
}

export class DescontoBlackFriday implements CalculadoraDeDesconto {
  calcular(valorOriginal: number): number {
    return valorOriginal * 0.5; // 50% off
  }
}

// Essa função NUNCA precisa ser modificada para suportar um novo tipo de
// desconto — basta criar uma nova classe que implemente CalculadoraDeDesconto.
export function aplicarDesconto(valor: number, estrategia: CalculadoraDeDesconto): number {
  return estrategia.calcular(valor);
}

if (require.main === module) {
  console.log(aplicarDesconto(100, new DescontoNatal()));
  console.log(aplicarDesconto(100, new DescontoBlackFriday()));
}
