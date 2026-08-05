// EXEMPLO — Repository Pattern
// Rode com: npx ts-node 01-repository-pattern.exemplo.ts

export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export interface UsuarioRepository {
  buscarPorId(id: number): Promise<Usuario | null>;
  criar(dados: Omit<Usuario, 'id'>): Promise<Usuario>;
}

export class UsuarioRepositoryEmMemoria implements UsuarioRepository {
  private usuarios: Usuario[] = [];
  private proximoId = 1;

  async buscarPorId(id: number): Promise<Usuario | null> {
    return this.usuarios.find((u) => u.id === id) ?? null;
  }
  async criar(dados: Omit<Usuario, 'id'>): Promise<Usuario> {
    const novo = { id: this.proximoId++, ...dados };
    this.usuarios.push(novo);
    return novo;
  }
}

export class UsuarioService {
  constructor(private repo: UsuarioRepository) {}

  async registrar(nome: string, email: string): Promise<Usuario> {
    if (!email.includes('@')) throw new Error('Email inválido');
    return this.repo.criar({ nome, email });
  }
}

async function main() {
  const service = new UsuarioService(new UsuarioRepositoryEmMemoria());
  const usuario = await service.registrar('Alexandre', 'alexandre@email.com');
  console.log(usuario);
}

if (require.main === module) {
  main();
}
