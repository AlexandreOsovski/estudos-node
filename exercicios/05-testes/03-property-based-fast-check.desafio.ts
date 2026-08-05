/*
DESAFIO — Property-Based Testing com fast-check

Implemente `clamp(valor, min, max)` que restringe `valor` ao intervalo
[min, max] (se valor < min, retorna min; se valor > max, retorna max;
caso contrário, retorna valor).

Escreva testes com fast-check verificando PROPRIEDADES gerais (não
exemplos fixos):

  1. Para QUALQUER valor, min e max (com min <= max), o resultado de
     clamp(valor, min, max) deve estar sempre entre min e max (inclusive).
  2. Para QUALQUER valor já dentro do intervalo [min, max], clamp deve
     retornar o próprio valor, sem alterá-lo.

Dica: use fc.integer() para gerar os valores, e fc.pre() (ou lógica
condicional) para garantir que min <= max nos casos gerados.

Rode com: npx vitest run 03-property-based-fast-check.desafio.ts
*/

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';

function clamp(valor: number, min: number, max: number): number {
  // TODO
  return valor;
}

describe('clamp (property-based)', () => {
  it('sempre retorna um valor dentro de [min, max]', () => {
    // TODO
  });

  it('retorna o próprio valor quando ele já está dentro do intervalo', () => {
    // TODO
  });
});
