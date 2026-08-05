/*
DESAFIO — Child Processes: evitando Command Injection

`listarArquivosVulneravel` (abaixo) está sujeita a Command Injection, pois
usa `exec` concatenando o diretório informado pelo "usuário" diretamente
no comando de shell.

Implemente `listarArquivosSeguro(diretorio)` usando `spawn` (ou
`execFile`), passando o argumento como item de um ARRAY — nunca
concatenado na string do comando — de forma que uma entrada maliciosa
como `". ; echo COMANDO INJETADO EXECUTOU"` NÃO seja interpretada como um
comando adicional, apenas como um (inválido) nome de diretório.

Rode com: node 04-child-process.desafio.js
*/

const { exec, spawn } = require('child_process');

function listarArquivosVulneravel(diretorio) {
  exec(`ls ${diretorio}`, (erro, stdout) => {
    console.log('[vulnerável] saída:', stdout || erro?.message);
  });
}

function listarArquivosSeguro(diretorio) {
  // TODO
}

const entradaMaliciosa = '. ; echo "COMANDO INJETADO EXECUTOU"';

console.log('--- Vulnerável ---');
listarArquivosVulneravel(entradaMaliciosa); // hoje: mostra "COMANDO INJETADO EXECUTOU"

console.log('--- Segura ---');
listarArquivosSeguro(entradaMaliciosa); // NÃO deve executar o comando injetado
