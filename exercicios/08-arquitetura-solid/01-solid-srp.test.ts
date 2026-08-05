import { describe, it, expect } from '@aleosovski/muitto';
import { expectRejects } from '../test-helpers';
import { ValidadorEmail, UsuarioRepository, EmailService, UsuarioServicePleno } from './01-solid-srp.exemplo';
import {
  ItemPedido,
  ValidadorPedido,
  CalculadoraDeTotal,
  PedidoRepository,
  NotificacaoService,
  PedidoService,
} from './01-solid-srp.desafio';

describe('SOLID — SRP (exemplo)', () => {
  it('registra um usuário com email válido sem lançar erro', async () => {
    const service = new UsuarioServicePleno(new ValidadorEmail(), new UsuarioRepository(), new EmailService());
    await service.registrar('Alexandre', 'alexandre@email.com');
    // se chegou até aqui sem lançar, passou — não há valor de retorno para checar.
  });

  it('rejeita email inválido', async () => {
    const service = new UsuarioServicePleno(new ValidadorEmail(), new UsuarioRepository(), new EmailService());
    await expectRejects(service.registrar('Alexandre', 'invalido'), 'Email inválido');
  });
});

describe('SOLID — SRP (desafio)', () => {
  function criarService() {
    return new PedidoService(new ValidadorPedido(), new CalculadoraDeTotal(), new PedidoRepository(), new NotificacaoService());
  }

  it('processa um pedido válido e retorna o total', () => {
    const itens: ItemPedido[] = [
      { nome: 'Teclado', preco: 250 },
      { nome: 'Mouse', preco: 80 },
    ];
    const total = criarService().processar(itens, 'ana@email.com');
    expect(total).toBe(330);
  });

  it('rejeita pedido sem itens', () => {
    expect(() => criarService().processar([], 'ana@email.com')).toThrow();
  });

  it('rejeita item com preço <= 0', () => {
    const itens: ItemPedido[] = [{ nome: 'Item grátis', preco: 0 }];
    expect(() => criarService().processar(itens, 'ana@email.com')).toThrow();
  });

  it('CalculadoraDeTotal soma os preços dos itens', () => {
    const itens: ItemPedido[] = [
      { nome: 'A', preco: 10 },
      { nome: 'B', preco: 20 },
    ];
    expect(new CalculadoraDeTotal().calcular(itens)).toBe(30);
  });

  it('ValidadorPedido rejeita item com preço negativo', () => {
    expect(() => new ValidadorPedido().validar([{ nome: 'X', preco: -1 }])).toThrow();
  });
});
