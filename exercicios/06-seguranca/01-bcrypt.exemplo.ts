// EXEMPLO — Hash de senha com bcrypt
// npm install bcrypt
// npm install -D @types/bcrypt
// Rode com: npx ts-node 01-bcrypt.exemplo.ts

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

async function main() {
  const senhaPura = 'MinhaSenh@123';
  const hash = await bcrypt.hash(senhaPura, SALT_ROUNDS);
  console.log('Hash gerado:', hash);

  const senhaCorreta = await bcrypt.compare('MinhaSenh@123', hash);
  const senhaErrada = await bcrypt.compare('senhaErrada', hash);

  console.log('Senha correta confere?', senhaCorreta);
  console.log('Senha errada confere?', senhaErrada);
}

main();

// ARMADILHA COMUM: usar MD5 ou SHA-256 puro para senhas é grave — são
// rápidos demais, vulneráveis a força bruta com GPUs. bcrypt (como
// argon2/scrypt) é propositalmente lento e usa salt automático.
