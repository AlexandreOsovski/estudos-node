/*
DESAFIO — Promise.allSettled

Implemente `notificarTodos(usuarios)` que tenta notificar cada usuário
(via `enviarNotificacao`, já implementada, que falha para ids pares) SEM
deixar que uma falha isolada impeça as notificações dos demais.

A função deve retornar um objeto:
  { enviados: string[], falharam: { id: number, motivo: string }[] }

Rode com: node 05-promise-allsettled.desafio.js
*/

async function enviarNotificacao(usuario) {
  if (usuario.id % 2 === 0) throw new Error(`Falha ao notificar usuário ${usuario.id}`);
  await new Promise((r) => setTimeout(r, 20));
  return `Notificado: ${usuario.nome}`;
}

async function notificarTodos(usuarios) {
  // TODO
}

async function main() {
  const usuarios = [
    { id: 1, nome: 'Ana' },
    { id: 2, nome: 'Bruno' },
    { id: 3, nome: 'Carla' },
    { id: 4, nome: 'Diego' },
  ];

  const resultado = await notificarTodos(usuarios);
  console.log(resultado);
  // esperado: enviados contém Ana e Carla; falharam contém ids 2 e 4
}

main();
