// EXEMPLO — Utility Types
// Rode com: npx ts-node 01-utility-types.exemplo.ts

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

type AtualizarUsuario = Partial<Usuario>;
const patch: AtualizarUsuario = { nome: 'Novo Nome' };

interface Config {
  timeout?: number;
  retries?: number;
}
type ConfigCompleta = Required<Config>;

type UsuarioPublico = Pick<Usuario, 'id' | 'nome'>;
const publico: UsuarioPublico = { id: 1, nome: 'Alexandre' };

type UsuarioSemSenha = Omit<Usuario, 'senha'>;
const semSenha: UsuarioSemSenha = { id: 1, nome: 'Alexandre', email: 'a@a.com' };

type Permissoes = Record<'admin' | 'editor' | 'viewer', boolean>;
const permissoes: Permissoes = { admin: true, editor: false, viewer: true };

function criarUsuario() {
  return { id: 1, nome: 'Ana', ativo: true };
}
type UsuarioCriado = ReturnType<typeof criarUsuario>;
const novoUsuario: UsuarioCriado = { id: 2, nome: 'Bia', ativo: false };

function enviarEmail(destinatario: string, assunto: string, corpo: string) {
  console.log(`Enviando para ${destinatario}: ${assunto}`);
}
type ParametrosEmail = Parameters<typeof enviarEmail>;

function enviarEmailComLog(...args: ParametrosEmail) {
  console.log('[LOG] Preparando envio de email...');
  enviarEmail(...args);
}

console.log({ patch, publico, semSenha, permissoes, novoUsuario });
enviarEmailComLog('ana@email.com', 'Bem-vinda', 'Olá, Ana!');
