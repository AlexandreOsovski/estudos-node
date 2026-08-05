import { describe, it, expect, fn } from '@aleosovski/muitto';
import { Pedido, CriarPedidoUseCase, PedidoRepositoryPort } from './04-clean-architecture.exemplo';
import { Assinatura, AtivarAssinaturaUseCase, AssinaturaRepositoryPort } from './04-clean-architecture.desafio';

describe('Clean Architecture (exemplo)', () => {
  it('Pedido: entidade calcula o total dos itens', () => {
    const pedido = new Pedido();
    pedido.adicionarItem('Teclado', 250);
    pedido.adicionarItem('Mouse', 80);
    expect(pedido.calcularTotal()).toBe(330);
  });

  it('Pedido: rejeita item com preço <= 0', () => {
    const pedido = new Pedido();
    expect(() => pedido.adicionarItem('Grátis', 0)).toThrow();
  });

  it('CriarPedidoUseCase orquestra entidade + porta e retorna o total', async () => {
    const salvar = fn();
    const repoFake: PedidoRepositoryPort = { salvar };

    const useCase = new CriarPedidoUseCase(repoFake);
    const total = await useCase.executar([
      { nome: 'Teclado', preco: 250 },
      { nome: 'Mouse', preco: 80 },
    ]);

    expect(total).toBe(330);
    expect(salvar).toHaveBeenCalledTimes(1);
  });
});

describe('Clean Architecture (desafio)', () => {
  it('Assinatura: ativa com mesesPagos > 0', () => {
    const assinatura = new Assinatura();
    assinatura.ativar(3);
    expect(assinatura.estaAtiva()).toBeTruthy();
  });

  it('Assinatura: rejeita mesesPagos <= 0', () => {
    const assinatura = new Assinatura();
    expect(() => assinatura.ativar(0)).toThrow();
  });

  it('Assinatura recém-criada não está ativa', () => {
    expect(new Assinatura().estaAtiva()).toBeFalsy();
  });

  it('AtivarAssinaturaUseCase ativa, salva e retorna true', async () => {
    const salvar = fn();
    const repoFake: AssinaturaRepositoryPort = { salvar };

    const useCase = new AtivarAssinaturaUseCase(repoFake);
    const resultado = await useCase.executar(3);

    expect(resultado).toBeTruthy();
    expect(salvar).toHaveBeenCalledTimes(1);
  });
});
