import { describe, it, expect, fn } from '@aleosovski/muitto';
import { NotificacaoService, CanalDeNotificacao } from './03-solid-dip.exemplo';
import { CheckoutService, ProcessadorDePagamento, ProcessadorCartao, ProcessadorPix } from './03-solid-dip.desafio';

describe('SOLID — DIP (exemplo)', () => {
  it('NotificacaoService delega o envio para o canal injetado', async () => {
    const enviar = fn();
    const canalFake: CanalDeNotificacao = { enviar };

    const service = new NotificacaoService(canalFake);
    await service.notificarPedidoEnviado('ana@email.com');

    expect(enviar).toHaveBeenCalledWith('ana@email.com', 'Seu pedido foi enviado!');
  });
});

describe('SOLID — DIP (desafio)', () => {
  it('CheckoutService delega o processamento para o processador injetado', async () => {
    const processar = fn();
    processar.mockResolvedValue('tx-123');
    const processadorFake: ProcessadorDePagamento = { processar };

    const service = new CheckoutService(processadorFake);
    const resultado = await service.finalizarCompra(150);

    expect(processar).toHaveBeenCalledWith(150);
    expect(resultado).toBe('tx-123');
  });

  it('ProcessadorCartao retorna um id de transação (string)', async () => {
    const id = await new ProcessadorCartao().processar(150);
    expect(typeof id).toBe('string');
  });

  it('ProcessadorPix retorna um id de transação (string)', async () => {
    const id = await new ProcessadorPix().processar(150);
    expect(typeof id).toBe('string');
  });
});
