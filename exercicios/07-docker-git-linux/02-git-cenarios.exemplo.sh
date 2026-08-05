#!/usr/bin/env bash
# EXEMPLO — Git: Rebase interativo, Cherry-pick e Conflitos
#
# Este script MONTA um repositório git de teste, isolado em /tmp, com os
# 3 cenários do README (histórico "sujo" para rebase, hotfix para
# cherry-pick, e um conflito de merge). Ele não faz o rebase/cherry-pick
# por você — a ideia é você praticar os comandos reais na sequência.
#
# Rode com: bash 02-git-cenarios.exemplo.sh

set -euo pipefail

REPO="/tmp/estudo-git-exemplo-$$"
rm -rf "$REPO"
mkdir -p "$REPO"
cd "$REPO"

git init -q
git config user.email "estudo@exemplo.com"
git config user.name "Estudo Node"

# --- Cenário 1: histórico sujo para squash/reword via rebase -i ---
echo "function validar(cpf) { return cpf.length === 11; }" > validacao.js
git add validacao.js && git commit -q -m "feat: implementa validação de CPF"

echo "// ajuste 1" >> validacao.js
git add validacao.js && git commit -q -m "wip: mais um ajuste"

echo "// ajuste 2" >> validacao.js
git add validacao.js && git commit -q -m "wip: ajustando validação"

echo "// fix typo" >> validacao.js
git add validacao.js && git commit -q -m "fix typo"

echo "Repositório criado em: $REPO"
echo
echo "--- Cenário 1: rebase interativo ---"
git log --oneline
echo
echo "Experimente: git rebase -i HEAD~4"
echo "(marque squash nos 2 'wip', reword no 'fix typo', mantendo o 'feat' como pick)"

# --- Cenário 2: cherry-pick de hotfix entre branches ---
git branch release/v1.0
echo "// vazamento de memória corrigido" >> validacao.js
git add validacao.js && git commit -q -m "fix: corrige vazamento de memória em Worker Thread"
HOTFIX_HASH=$(git rev-parse HEAD)

echo
echo "--- Cenário 2: cherry-pick ---"
echo "Commit de hotfix na main: $HOTFIX_HASH"
echo "Experimente: git checkout release/v1.0 && git cherry-pick $HOTFIX_HASH"

# --- Cenário 3: conflito de merge ---
git checkout -q -b feature/nova-validacao main 2>/dev/null || git checkout -q -b feature/nova-validacao master
echo "function validar(cpf) { return /^\\d{11}\$/.test(cpf); }" > validacao-conflito.js
git add validacao-conflito.js && git commit -q -m "feat: nova regra de validação com regex"

git checkout -q main 2>/dev/null || git checkout -q master
echo "function validar(cpf) { return cpf.trim().length === 11; }" > validacao-conflito.js
git add validacao-conflito.js && git commit -q -m "feat: trim antes de validar tamanho"

echo
echo "--- Cenário 3: conflito de merge ---"
echo "Experimente: git merge feature/nova-validacao"
echo "(vai gerar CONFLICT em validacao-conflito.js — pratique resolver e commitar)"
