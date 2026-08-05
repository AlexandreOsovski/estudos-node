// EXEMPLO — Teste unitário com Vitest mockando um repositório
// npm install -D vitest
// Rode com: npx vitest run 01-unit-vitest.exemplo.ts

import { describe, it, expect, vi } from 'vitest';

interface UsuarioRepository {
  buscarPorId(id: number): Promise<{ id: number; nome: string } | null>;
}

class UsuarioService {
  constructor(private repo: UsuarioRepository) {}

  async obterNomeFormatado(id: number): Promise<string> {
    const usuario = await this.repo.buscarPorId(id);
    if (!usuario) throw new Error('Usuário não encontrado');
    return usuario.nome.toUpperCase();
  }
}

describe('UsuarioService', () => {
  it('retorna o nome formatado quando o usuário existe', async () => {
    const repoMock: UsuarioRepository = {
      buscarPorId: vi.fn().mockResolvedValue({ id: 1, nome: 'ana' }),
    };
    const service = new UsuarioService(repoMock);
    const resultado = await service.obterNomeFormatado(1);

    expect(resultado).toBe('ANA');
    expect(repoMock.buscarPorId).toHaveBeenCalledWith(1);
    expect(repoMock.buscarPorId).toHaveBeenCalledTimes(1);
  });

  it('lança erro quando o usuário não existe', async () => {
    const repoMock: UsuarioRepository = {
      buscarPorId: vi.fn().mockResolvedValue(null),
    };
    const service = new UsuarioService(repoMock);
    await expect(service.obterNomeFormatado(99)).rejects.toThrow('Usuário não encontrado');
  });
});
