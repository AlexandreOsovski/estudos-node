// EXEMPLO — Property-Based Testing com fast-check
// npm install -D fast-check vitest
// Rode com: npx vitest run 03-property-based-fast-check.exemplo.ts

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';

function ehPositivo(n: number): boolean {
  return n > 0;
}

describe('ehPositivo (property-based)', () => {
  it('deve retornar true para QUALQUER número maior que zero', () => {
    fc.assert(
      fc.property(fc.float({ min: Math.fround(0.0001), max: 1_000_000, noNaN: true }), (numeroAleatorio) => {
        expect(ehPositivo(numeroAleatorio)).toBe(true);
      })
    );
  });

  it('deve retornar false para QUALQUER número menor ou igual a zero', () => {
    fc.assert(
      fc.property(fc.float({ min: -1_000_000, max: 0, noNaN: true }), (numeroAleatorio) => {
        expect(ehPositivo(numeroAleatorio)).toBe(false);
      })
    );
  });
});
