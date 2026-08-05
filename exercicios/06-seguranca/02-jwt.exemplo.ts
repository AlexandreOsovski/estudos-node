// EXEMPLO — JWT: geração, verificação e refresh token
// npm install jsonwebtoken
// npm install -D @types/jsonwebtoken
// Rode com: npx ts-node 02-jwt.exemplo.ts

import jwt from 'jsonwebtoken';

const SEGREDO_ACCESS = 'chave-secreta-access-token';
const SEGREDO_REFRESH = 'chave-secreta-refresh-token';

function gerarTokens(usuarioId: number) {
  const accessToken = jwt.sign({ sub: usuarioId }, SEGREDO_ACCESS, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ sub: usuarioId }, SEGREDO_REFRESH, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}

function verificarAccessToken(token: string) {
  return jwt.verify(token, SEGREDO_ACCESS) as { sub: number };
}

function renovarAccessToken(refreshToken: string) {
  const payload = jwt.verify(refreshToken, SEGREDO_REFRESH) as { sub: number };
  return jwt.sign({ sub: payload.sub }, SEGREDO_ACCESS, { expiresIn: '15m' });
}

const { accessToken, refreshToken } = gerarTokens(42);
console.log('Access Token:', accessToken.slice(0, 30) + '...');

const dadosDecodificados = verificarAccessToken(accessToken);
console.log('Payload decodificado:', dadosDecodificados);

const novoAccessToken = renovarAccessToken(refreshToken);
console.log('Novo Access Token gerado via refresh:', novoAccessToken.slice(0, 30) + '...');

try {
  jwt.verify('token.invalido.aqui', SEGREDO_ACCESS);
} catch (erro: any) {
  console.log('Erro esperado ao verificar token inválido:', erro.message);
}

// Dois segredos diferentes limitam o dano: se SEGREDO_ACCESS vazar, um
// atacante só forja tokens de curta duração — não consegue gerar
// refresh tokens válidos de 7 dias.
