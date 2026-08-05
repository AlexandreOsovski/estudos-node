/*
DESAFIO — JWT: middleware de autenticação

Implemente:
  1. `gerarAccessToken(usuarioId)`: gera um JWT (expiresIn '15m') assinado
     com SEGREDO_ACCESS.
  2. `autenticarRequisicao(req, res, next)`: middleware Express que:
       - lê o header Authorization no formato "Bearer <token>"
       - se não houver header, responde 401 { erro: 'token ausente' }
       - se o token for inválido/expirado, responde 401 { erro: 'token inválido' }
       - se for válido, anexa `req.usuarioId` (do payload `sub`) e chama next()
  3. Uma rota GET /perfil protegida por `autenticarRequisicao` que responde
     { usuarioId: req.usuarioId }.

Rode com: npx ts-node 02-jwt.desafio.ts
Teste com:
  curl localhost:3000/perfil                                            # 401 sem header
  curl localhost:3000/perfil -H "Authorization: Bearer token-invalido"   # 401 inválido
  (o script já imprime um token válido no console para você testar o caso de sucesso)
*/

import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SEGREDO_ACCESS = 'chave-secreta-access-token';

function gerarAccessToken(usuarioId: number): string {
  // TODO
  throw new Error('não implementado');
}

function autenticarRequisicao(req: Request, res: Response, next: NextFunction) {
  // TODO
}

const app = express();

app.get('/perfil', autenticarRequisicao, (req: any, res: Response) => {
  res.json({ usuarioId: req.usuarioId });
});

const tokenDeTeste = gerarAccessToken(42);
console.log('Token de teste (cole em "Authorization: Bearer <token>"):', tokenDeTeste);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
