/*
DESAFIO — Streams: Transform + pipeline (caminho inverso)

Implemente um Transform Stream `jsonlParaCsv` que lê um arquivo texto onde
cada linha é um JSON (`dados.jsonl`, já gerado abaixo) e escreve um CSV
equivalente em `saida.csv`, com cabeçalho na primeira linha.

Use `pipeline()` (de 'stream/promises' ou 'stream') para orquestrar
leitura -> transformação -> escrita, tratando erros corretamente (veja o
exemplo em 01-streams.exemplo.js para o caminho inverso).

Rode com: node 01-streams.desafio.js
*/

const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');

const jsonlPath = path.join(__dirname, 'dados.jsonl');
fs.writeFileSync(
  jsonlPath,
  '{"nome":"Ana","idade":"30"}\n{"nome":"Bruno","idade":"25"}\n{"nome":"Carla","idade":"40"}\n'
);

let cabecalhoEscrito = false;

const jsonlParaCsv = new Transform({
  transform(chunk, _encoding, callback) {
    // TODO: parseie cada linha JSON e empurre (this.push) as linhas CSV
    // correspondentes, escrevendo o cabeçalho apenas uma vez.
    callback();
  },
});

async function main() {
  // TODO: monte o pipeline: readStream(jsonlPath) -> jsonlParaCsv -> writeStream(saida.csv)
  // depois imprima o conteúdo de saida.csv no console
}

main();
