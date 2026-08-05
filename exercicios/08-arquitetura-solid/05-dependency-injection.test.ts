import { describe, it, expect, spyOn } from '@aleosovski/muitto';
import { criarPedidoService } from './05-dependency-injection.exemplo';
import { criarAuditoriaService } from './05-dependency-injection.desafio';

describe('Injeção de Dependência (exemplo)', () => {
  it('ambiente "producao" loga no console', () => {
    const spy = spyOn(console, 'log');
    const servico = criarPedidoService('producao');
    servico.processar(101);

    expect(spy).toHaveBeenCalledWith('[LOG] Processando pedido 101');
    spy.mockRestore();
  });

  it('ambiente "teste" não loga nada (logger mudo)', () => {
    const spy = spyOn(console, 'log');
    const servico = criarPedidoService('teste');
    servico.processar(101);

    expect(spy).toHaveBeenCalledTimes(0);
    spy.mockRestore();
  });
});

describe('Injeção de Dependência (desafio)', () => {
  it('ambiente "producao" loga com timestamp ISO', () => {
    const spy = spyOn(console, 'log');
    const servico = criarAuditoriaService('producao');
    servico.registrarEvento('Usuário fez login');

    expect(spy).toHaveBeenCalledTimes(1);
    const [mensagem] = spy.mock.calls[0];
    expect(mensagem).toMatch(/^\[.+\] Usuário fez login$/);
    spy.mockRestore();
  });

  it('ambiente "teste" não polui o console', () => {
    const spy = spyOn(console, 'log');
    const servico = criarAuditoriaService('teste');
    servico.registrarEvento('Evento em ambiente de teste');

    expect(spy).toHaveBeenCalledTimes(0);
    spy.mockRestore();
  });
});
