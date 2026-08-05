/*
DESAFIO — Open/Closed Principle

Implemente a interface `CalculadoraDeFrete` com o método
`calcular(pesoKg: number): number`.

Crie duas implementações:
  - FreteSedex: calcular = 15 + pesoKg * 3
  - FretePac: calcular = 8 + pesoKg * 1.5

Implemente `calcularFreteTotal(pesoKg, estrategia)` que usa a estratégia
recebida, SEM nenhum if/switch sobre o "tipo" de frete dentro dela — a
função não deve precisar ser modificada quando uma nova transportadora
(ex: FreteExpresso) for adicionada no futuro.

Rode com: npx ts-node 02-solid-ocp.desafio.ts
*/

export interface CalculadoraDeFrete {
  calcular(pesoKg: number): number;
}

// TODO: implemente FreteSedex e FretePac (calcular = 15 + pesoKg*3 / 8 + pesoKg*1.5)
export class FreteSedex implements CalculadoraDeFrete {
  calcular(pesoKg: number): number {
    // TODO
    return 0;
  }
}

export class FretePac implements CalculadoraDeFrete {
  calcular(pesoKg: number): number {
    // TODO
    return 0;
  }
}

export function calcularFreteTotal(pesoKg: number, estrategia: CalculadoraDeFrete): number {
  // TODO
  return 0;
}

if (require.main === module) {
  console.log(calcularFreteTotal(2, new FreteSedex())); // esperado: 21
  console.log(calcularFreteTotal(2, new FretePac())); // esperado: 11
}
