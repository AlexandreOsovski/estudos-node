import { describe, it, expect, fn } from '@aleosovski/muitto';
import { EventEmitter } from 'events';
import { PedidoEmitter, comLog, somar } from './04-design-patterns.exemplo';
import { EstoqueEmitter, comRetry } from './04-design-patterns.desafio';

describe('Design Patterns (exemplo)', () => {
  it('PedidoEmitter é um EventEmitter e notifica todos os observers', () => {
    const pedidos = new PedidoEmitter();
    const observer1 = fn();
    const observer2 = fn();

    pedidos.on('pedido:criado', observer1);
    pedidos.on('pedido:criado', observer2);
    pedidos.emit('pedido:criado', { id: 101, total: 250 });

    expect(observer1).toHaveBeenCalledWith({ id: 101, total: 250 });
    expect(observer2).toHaveBeenCalledWith({ id: 101, total: 250 });
  });

  it('comLog decora a função sem alterar seu resultado', () => {
    const somarComLog = comLog(somar);
    expect(somarComLog(2, 3)).toBe(5);
  });
});

describe('Design Patterns (desafio)', () => {
  it('EstoqueEmitter é utilizável como EventEmitter', () => {
    const estoque = new EstoqueEmitter();
    expect(estoque).toBeInstanceOf(EventEmitter);

    const observer = fn();
    estoque.on('estoque:baixo', observer);
    estoque.emit('estoque:baixo', { id: 55, quantidade: 3 });

    expect(observer).toHaveBeenCalledWith({ id: 55, quantidade: 3 });
  });

  it('comRetry retorna o resultado assim que uma tentativa tem sucesso', () => {
    let chamadas = 0;
    function instavel() {
      chamadas++;
      if (chamadas < 3) throw new Error(`falhou na tentativa ${chamadas}`);
      return 'sucesso!';
    }

    const comRetryFn = comRetry(instavel, 5);
    expect(comRetryFn()).toBe('sucesso!');
    expect(chamadas).toBe(3);
  });

  it('comRetry relança o último erro se todas as tentativas falharem', () => {
    function sempreFalha() {
      throw new Error('sempre falha');
    }

    const comRetryFn = comRetry(sempreFalha, 3);
    expect(() => comRetryFn()).toThrow('sempre falha');
  });
});
