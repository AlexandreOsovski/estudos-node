#!/usr/bin/env bash
# DESAFIO — Linux: encerramento gracioso de processo por porta
#
# O exemplo (03-linux-scripts.exemplo.sh) mata o processo na porta com
# `kill -9` direto — isso não dá chance de o processo limpar recursos
# (fechar conexões de banco, terminar requisições em andamento, etc).
#
# Implemente `encerrar_processo_na_porta`, uma função bash que:
#   1. Recebe a porta como argumento ($1)
#   2. Se NENHUM processo estiver escutando nela, imprime
#      "Porta $1 já está livre." e retorna (sem erro)
#   3. Se houver processo, envia SIGTERM (kill, sem -9) ao PID
#   4. Espera até 5 segundos, checando a cada 1 segundo se o processo
#      ainda existe (kill -0 "$PID" retorna sucesso enquanto o processo
#      existir)
#   5. Se após 5 segundos o processo AINDA existir, força com `kill -9`
#      e imprime um aviso de que foi necessário forçar
#   6. Se o processo terminou sozinho antes disso, imprime quanto tempo
#      levou
#
# Use `set -euo pipefail` no topo do script.
#
# Rode com: chmod +x 03-linux-scripts.desafio.sh
#           ./03-linux-scripts.desafio.sh <porta>
# (para testar de verdade, suba algo escutando numa porta antes, ex:
#  `node -e "require('http').createServer().listen(4000)" &` e rode o
#  script passando 4000)

set -euo pipefail

encerrar_processo_na_porta() {
  local porta="$1"
  # TODO: implemente os passos 2 a 6 do enunciado
}

if [ "$#" -ne 1 ]; then
  echo "Uso: $0 <porta>"
  exit 1
fi

encerrar_processo_na_porta "$1"
