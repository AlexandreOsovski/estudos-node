// EXEMPLO — Streams: Readable, Writable, Transform e Pipeline
// Rode com: node 01-streams.exemplo.js

const { Transform, pipeline } = require('stream');
const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'dados.csv');
fs.writeFileSync(csvPath, 'nome,idade\nAna,30\nBruno,25\nCarla,40\n');

let cabecalho = null;
let buffer = '';

const csvParaJson = new Transform({
  transform(chunk, _encoding, callback) {
    buffer += chunk.toString();
    const linhas = buffer.split('\n');
    buffer = linhas.pop();

    for (const linha of linhas) {
      if (!linha.trim()) continue;
      const valores = linha.split(',');

      if (!cabecalho) {
        cabecalho = valores;
        continue;
      }

      const obj = Object.fromEntries(cabecalho.map((h, i) => [h, valores[i]]));
      this.push(JSON.stringify(obj) + '\n');
    }
    callback();
  },
});

const origem = fs.createReadStream(csvPath, { encoding: 'utf8' });
const destino = fs.createWriteStream(path.join(__dirname, 'dados.jsonl'));

pipeline(origem, csvParaJson, destino, (erro) => {
  if (erro) {
    console.error('Pipeline falhou:', erro);
    return;
  }
  console.log('Pipeline concluído com sucesso.');
  console.log(fs.readFileSync(path.join(__dirname, 'dados.jsonl'), 'utf8'));
});
