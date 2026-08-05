#!/usr/bin/env bash
# EXEMPLO — Linux para Dev Back-end: script de deploy simples
# Rode com: chmod +x 03-linux-scripts.exemplo.sh && ./03-linux-scripts.exemplo.sh
# (adaptado para não depender de um repo git real — simula os passos)

set -euo pipefail  # para IMEDIATAMENTE em caso de erro, variável não definida, ou falha em pipe

PORTA=3000

echo "🔄 (simulado) git pull origin main..."
echo "📦 (simulado) npm ci --omit=dev..."
echo "🔨 (simulado) npm run build..."

echo "🩺 Verificando se a porta $PORTA está livre antes de reiniciar..."
if lsof -i ":$PORTA" > /dev/null 2>&1; then
  echo "⚠️  Porta $PORTA em uso — encerrando processo antigo..."
  kill -9 "$(lsof -t -i:"$PORTA")"
else
  echo "✅ Porta $PORTA livre."
fi

echo "🚀 (simulado) Iniciando aplicação..."
echo "✅ Deploy concluído."

# ARMADILHA COMUM: esquecer 'set -euo pipefail' no topo do script faz com
# que, se um dos passos falhar (ex: erro de build), o script CONTINUE
# executando os passos seguintes mesmo assim — resultando em deploy de
# uma versão quebrada.
