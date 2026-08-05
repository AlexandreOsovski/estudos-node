/*
DESAFIO — Injeção de Dependência sem framework (múltiplas dependências)

Implemente a interface `Relogio` com o método `agora(): Date` (permite
"injetar" o tempo — essencial para testes determinísticos).

Implemente `RelogioReal implements Relogio` (retorna `new Date()`).

Implemente `AuditoriaService`, que recebe um `Logger` (já dado abaixo) E
um `Relogio` via construtor, com o método `registrarEvento(mensagem: string)`
que loga `[<timestamp ISO>] mensagem` usando `this.logger.log(...)`.

Implemente `criarAuditoriaService(ambiente: 'producao' | 'teste')`: em
'producao', usa ConsoleLogger + RelogioReal; em 'teste', usa um logger
"mudo" (não imprime nada) e um Relogio fake que sempre retorna a mesma
data fixa (ex: new Date('2026-01-01T00:00:00Z')) — útil para snapshots de
teste determinísticos.

Rode com: npx ts-node 05-dependency-injection.desafio.ts
*/

export interface Logger {
  log(mensagem: string): void;
}

export class ConsoleLogger implements Logger {
  log(mensagem: string): void {
    console.log(`[LOG] ${mensagem}`);
  }
}

// TODO: Relogio, RelogioReal
export interface Relogio {
  agora(): Date;
}

export class RelogioReal implements Relogio {
  agora(): Date {
    // TODO
    throw new Error('não implementado');
  }
}

export class AuditoriaService {
  // TODO: injete Logger e Relogio via construtor

  registrarEvento(mensagem: string): void {
    // TODO
  }
}

export function criarAuditoriaService(ambiente: 'producao' | 'teste'): AuditoriaService {
  // TODO
  throw new Error('não implementado');
}

if (require.main === module) {
  const servicoProducao = criarAuditoriaService('producao');
  servicoProducao.registrarEvento('Usuário fez login');

  const servicoTeste = criarAuditoriaService('teste');
  servicoTeste.registrarEvento('Evento em ambiente de teste'); // não deve poluir o console
}
