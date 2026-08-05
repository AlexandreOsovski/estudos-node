import { describe, it, expect, fn } from '@aleosovski/muitto';
import { expectRejects } from '../test-helpers';
import { asyncHandler as asyncHandlerExemplo, buscarUsuario, ErroNaoEncontrado, ErroValidacao } from './02-tratamento-erros.exemplo';
import { asyncHandler as asyncHandlerDesafio, criarProduto, ErroConflito } from './02-tratamento-erros.desafio';

describe('Tratamento de Erros (exemplo)', () => {
  it('buscarUsuario resolve para o id 1', async () => {
    const usuario = await buscarUsuario('1');
    expect(usuario).toEqual({ id: 1, nome: 'Ana' });
  });

  it('buscarUsuario lança ErroNaoEncontrado (status 404) para outros ids', async () => {
    const erro = await expectRejects(buscarUsuario('2'), 'Usuário 2 não existe');
    expect(erro).toBeInstanceOf(ErroNaoEncontrado);
    expect((erro as any).status).toBe(404);
  });

  it('ErroValidacao tem status 400', () => {
    expect(new ErroValidacao('x').status).toBe(400);
  });

  it('asyncHandler encaminha erro assíncrono para next()', async () => {
    const next = fn();
    const erro = new Error('falhou');
    const handler = asyncHandlerExemplo(async () => {
      throw erro;
    });

    await handler({}, {}, next);

    expect(next).toHaveBeenCalledWith(erro);
  });

  it('asyncHandler não chama next() quando não há erro', async () => {
    const next = fn();
    const handler = asyncHandlerExemplo(async () => 'ok');

    await handler({}, {}, next);

    expect(next).toHaveBeenCalledTimes(0);
  });
});

describe('Tratamento de Erros (desafio)', () => {
  it('ErroConflito tem status 409', () => {
    expect(new ErroConflito('x').status).toBe(409);
  });

  it('criarProduto cria e registra o nome quando os dados são válidos', () => {
    const produtosExistentes: string[] = [];
    const produto = criarProduto('Mouse', 50, produtosExistentes);

    expect(produto).toEqual({ nome: 'Mouse', preco: 50 });
    expect(produtosExistentes).toContain('Mouse');
  });

  it('rejeita quando falta nome ou preço', () => {
    expect(() => criarProduto(undefined, 50, [])).toThrow();
    expect(() => criarProduto('Mouse', undefined, [])).toThrow();
  });

  it('rejeita quando o nome já existe (conflito)', () => {
    expect(() => criarProduto('Mouse', 50, ['Mouse'])).toThrow();
  });

  it('asyncHandler (desafio) também encaminha erro assíncrono para next()', async () => {
    const next = fn();
    const erro = new Error('falhou');
    const handler = asyncHandlerDesafio(async () => {
      throw erro;
    });

    await handler({}, {}, next);

    expect(next).toHaveBeenCalledWith(erro);
  });
});
