import { describe, it, expect } from '@aleosovski/muitto';
import { aplicarDesconto, DescontoNatal, DescontoBlackFriday } from './02-solid-ocp.exemplo';
import { calcularFreteTotal, FreteSedex, FretePac } from './02-solid-ocp.desafio';

describe('SOLID — OCP (exemplo)', () => {
  it('aplica 10% de desconto no Natal', () => {
    expect(aplicarDesconto(100, new DescontoNatal())).toBe(90);
  });

  it('aplica 50% de desconto na Black Friday', () => {
    expect(aplicarDesconto(100, new DescontoBlackFriday())).toBe(50);
  });
});

describe('SOLID — OCP (desafio)', () => {
  it('FreteSedex: 15 + peso * 3', () => {
    expect(calcularFreteTotal(2, new FreteSedex())).toBe(21);
  });

  it('FretePac: 8 + peso * 1.5', () => {
    expect(calcularFreteTotal(2, new FretePac())).toBe(11);
  });
});
