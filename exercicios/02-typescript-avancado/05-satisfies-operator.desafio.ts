/*
DESAFIO — satisfies

Dado o tipo `NivelDeLog = 'debug' | 'info' | 'warn' | 'error'`, crie a
constante `coresPorNivel` mapeando cada nível a uma string de cor (ex: um
código hexadecimal), usando `satisfies Record<NivelDeLog, string>` de forma
que:

  - o TypeScript acuse erro de compilação se você esquecer algum nível
    ou digitar um nível que não existe em NivelDeLog
  - o tipo de `coresPorNivel.debug` continue sendo o LITERAL da cor
    escolhida (não apenas `string` genérico) — confirme isso passando o
    mouse/verificando o tipo no seu editor

Depois, implemente `logColorido(nivel: NivelDeLog, mensagem: string): void`
que usa `coresPorNivel[nivel]` para logar `[<cor>] mensagem`.

Rode com: npx ts-node 05-satisfies-operator.desafio.ts
*/

type NivelDeLog = 'debug' | 'info' | 'warn' | 'error';

// TODO: use satisfies Record<NivelDeLog, string>
const coresPorNivel = {
  // preencha os 4 níveis
};

function logColorido(nivel: NivelDeLog, mensagem: string): void {
  // TODO
}

logColorido('info', 'Servidor iniciado');
logColorido('error', 'Falha ao conectar no banco');
