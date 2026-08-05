import { describe, it, expect } from '@aleosovski/muitto';
import { expectRejects } from '../test-helpers';
import { UsuarioService, UsuarioRepositoryEmMemoria } from './01-repository-pattern.exemplo';
import { ProdutoService, ProdutoRepositoryEmMemoria } from './01-repository-pattern.desafio';

describe('Repository Pattern (exemplo)', () => {
  it('registra um usuário com email válido', async () => {
    const service = new UsuarioService(new UsuarioRepositoryEmMemoria());
    const usuario = await service.registrar('Alexandre', 'alexandre@email.com');
    expect(usuario.id).toBe(1);
    expect(usuario.nome).toBe('Alexandre');
    expect(usuario.email).toBe('alexandre@email.com');
  });

  it('rejeita email inválido', async () => {
    const service = new UsuarioService(new UsuarioRepositoryEmMemoria());
    await expectRejects(service.registrar('Alexandre', 'invalido'), 'Email inválido');
  });
});

describe('Repository Pattern (desafio)', () => {
  it('cadastra um produto válido', async () => {
    const service = new ProdutoService(new ProdutoRepositoryEmMemoria());
    const produto = await service.cadastrarProduto('Teclado', 250, 10);
    expect(produto.nome).toBe('Teclado');
    expect(produto.preco).toBe(250);
    expect(produto.estoque).toBe(10);
  });

  it('rejeita preço <= 0', async () => {
    const service = new ProdutoService(new ProdutoRepositoryEmMemoria());
    await expectRejects(service.cadastrarProduto('Produto inválido', -10, 5));
  });

  it('rejeita estoque negativo', async () => {
    const service = new ProdutoService(new ProdutoRepositoryEmMemoria());
    await expectRejects(service.cadastrarProduto('Produto inválido', 10, -5));
  });

  it('buscarPorId encontra um produto criado', async () => {
    const repo = new ProdutoRepositoryEmMemoria();
    const service = new ProdutoService(repo);
    const criado = await service.cadastrarProduto('Monitor', 900, 3);
    const encontrado = await (repo as any).buscarPorId(criado.id);
    expect(encontrado).toEqual(criado);
  });

  it('listarComEstoqueBaixo retorna só produtos abaixo do limite', async () => {
    const repo = new ProdutoRepositoryEmMemoria();
    const service = new ProdutoService(repo);
    await service.cadastrarProduto('Teclado', 250, 2);
    await service.cadastrarProduto('Monitor', 900, 50);
    const baixos = await (repo as any).listarComEstoqueBaixo(5);
    expect(baixos).toHaveLength(1);
    expect(baixos[0].nome).toBe('Teclado');
  });
});
