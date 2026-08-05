// EXEMPLO — SQL Injection: vulnerável vs parametrizada
// npm install pg
// Rode com: npx ts-node 03-sql-injection.exemplo.ts

import { Pool } from 'pg';
const pool = new Pool();

async function buscarUsuarioVulneravel(emailDigitado: string) {
  const query = `SELECT * FROM usuarios WHERE email = '${emailDigitado}'`;
  console.log('Query executada:', query);
  return pool.query(query);
}

async function buscarUsuarioSeguro(emailDigitado: string) {
  const query = 'SELECT * FROM usuarios WHERE email = $1';
  console.log('Query executada:', query, '| Parâmetro:', emailDigitado);
  return pool.query(query, [emailDigitado]);
}

const entradaMaliciosa = "' OR '1'='1";
console.log('--- Vulnerável ---');
console.log(`SELECT * FROM usuarios WHERE email = '${entradaMaliciosa}'`);
console.log('--- Segura (parametrizada) ---');
console.log('SELECT * FROM usuarios WHERE email = $1  →  parâmetro tratado como valor literal');

// ARMADILHA COMUM: ORMs como Prisma e TypeORM protegem contra SQL
// Injection automaticamente nos métodos padrão — mas ambos oferecem
// "escape hatches" para SQL bruto ($queryRawUnsafe). Se você concatenar
// strings dentro desses métodos "unsafe", a proteção deixa de existir.
