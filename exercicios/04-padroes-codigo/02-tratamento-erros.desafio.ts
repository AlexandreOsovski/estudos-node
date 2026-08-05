/*
DESAFIO — Tratamento de Erros: wrapper assíncrono + exception filter

Complete o servidor abaixo:

  1. Crie a classe `ErroConflito extends Error` com `status = 409`.
  2. Implemente `criarProduto(nome, preco, produtosExistentes)` que:
       - lança `ErroValidacao` (já existe abaixo) se `nome` ou `preco` estiverem
         ausentes/inválidos (preco <= 0)
       - lança `ErroConflito` se `nome` já estiver em `produtosExistentes`
       - senão, adiciona o nome em `produtosExistentes` e retorna
         `{ nome, preco }`
  3. A rota `POST /produtos` (dentro de `main`) já está com o wiring pronto
     — ela só chama `criarProduto` através do `asyncHandler`. Confirme que
     o middleware de erro final trata os dois tipos de erro, retornando o
     status certo e `{ erro, tipo }`.

Rode com: npx tsx 02-tratamento-erros.desafio.ts
Depois teste com curl:
  curl -X POST localhost:3000/produtos -H "Content-Type: application/json" -d '{"nome":"Mouse","preco":50}'
  curl -X POST localhost:3000/produtos -H "Content-Type: application/json" -d '{"nome":"Mouse","preco":50}'   # repetir -> deve dar 409
  curl -X POST localhost:3000/produtos -H "Content-Type: application/json" -d '{}'                            # deve dar 400
*/

export class ErroValidacao extends Error {
  status = 400;
}

// TODO 1: ErroConflito
export class ErroConflito extends Error {
  status = 409;
}

type Handler<Req = unknown, Res = unknown> = (req: Req, res: Res, next: (erro?: unknown) => void) => unknown;

export function asyncHandler<Req, Res>(fn: Handler<Req, Res>): Handler<Req, Res> {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// TODO 2: criarProduto
export function criarProduto(
  nome: string | undefined,
  preco: number | undefined,
  produtosExistentes: string[]
): { nome: string; preco: number } {
  // TODO
  throw new Error('não implementado');
}

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const express = require('express');
  const app = express();
  app.use(express.json());

  const produtosExistentes: string[] = [];

  app.post(
    '/produtos',
    asyncHandler(async (req: any, res: any) => {
      const produto = criarProduto(req.body.nome, req.body.preco, produtosExistentes);
      res.status(201).json(produto);
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
