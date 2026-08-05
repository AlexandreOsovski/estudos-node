// EXEMPLO — Tratamento de Erros: wrapper assíncrono + exception filter
// npm install express
// Rode com: npx tsx 02-tratamento-erros.exemplo.ts

export class ErroNaoEncontrado extends Error {
  status = 404;
}
export class ErroValidacao extends Error {
  status = 400;
}

// asyncHandler é agnóstico de framework de propósito — não depende dos
// tipos do Express, só do formato (req, res, next) => void|Promise<void>.
// Isso permite testar a lógica de encaminhamento de erro sem precisar
// subir um servidor HTTP de verdade.
type Handler<Req = unknown, Res = unknown> = (req: Req, res: Res, next: (erro?: unknown) => void) => unknown;

export function asyncHandler<Req, Res>(fn: Handler<Req, Res>): Handler<Req, Res> {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export async function buscarUsuario(id: string) {
  if (id !== '1') throw new ErroNaoEncontrado(`Usuário ${id} não existe`);
  return { id: 1, nome: 'Ana' };
}

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const express = require('express');
  const app = express();
  app.use(express.json());

  app.get(
    '/usuarios/:id',
    asyncHandler(async (req: any, res: any) => {
      const usuario = await buscarUsuario(req.params.id);
      res.json(usuario);
    })
  );

  app.use((erro: any, req: any, res: any, next: any) => {
    const status = erro.status ?? 500;
    console.error(`[${status}]`, erro.message);
    res.status(status).json({ erro: erro.message, tipo: erro.constructor.name });
  });

  app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
}

if (require.main === module) {
  main();
}

// Teste com: curl localhost:3000/usuarios/2
// Esperado: 404 { "erro": "Usuário 2 não existe", "tipo": "ErroNaoEncontrado" }
