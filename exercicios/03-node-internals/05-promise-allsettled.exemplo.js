// EXEMPLO — Promise.allSettled
// Rode com: node 05-promise-allsettled.exemplo.js

async function buscarUsuario(id) {
  if (id === 2) throw new Error(`Usuário ${id} não encontrado`);
  await new Promise((r) => setTimeout(r, 50));
  return { id, nome: `Usuário ${id}` };
}

async function main() {
  const ids = [1, 2, 3];
  const resultados = await Promise.allSettled(ids.map((id) => buscarUsuario(id)));

  const sucessos = resultados.filter((r) => r.status === 'fulfilled').map((r) => r.value);
  const falhas = resultados.filter((r) => r.status === 'rejected').map((r) => r.reason.message);

  console.log('Resultados brutos:', resultados);
  console.log('Sucessos:', sucessos);
  console.log('Falhas:', falhas);
}

main();
