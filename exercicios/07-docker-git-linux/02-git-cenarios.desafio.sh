#!/usr/bin/env bash
# DESAFIO — Git: Rebase interativo, Cherry-pick e Conflitos
#
# Este script monta um repositório de teste em /tmp com um cenário
# análogo ao do exemplo, mas você precisa executar os comandos git na
# ordem certa para completar as 3 tarefas abaixo.
#
# TAREFA 1 (rebase -i): o histórico tem 5 commits "sujos" sobre a mesma
#   função `calcularDesconto`. Rode `git rebase -i HEAD~5` e:
#     - squash os 3 commits "wip" no commit "feat" (mantendo só 1 commit final)
#     - reword o commit "fix typo" para uma mensagem descritiva
#   Critério de sucesso: `git log --oneline` deve mostrar só 2 commits
#   novos (o "feat" squashado + o reword), sem nenhum "wip" ou "fix typo".
#
# TAREFA 2 (cherry-pick): o script cria um commit de hotfix na branch
#   `main` e uma branch `release/v2.0` sem esse commit. Faça checkout de
#   `release/v2.0` e traga SOMENTE esse commit de hotfix via cherry-pick
#   (sem trazer o restante do histórico da main).
#   Critério de sucesso: `git log release/v2.0 --oneline` deve conter o
#   commit de hotfix, mas NENHUM dos commits "wip"/"feat" da main.
#
# TAREFA 3 (conflito): as branches `main` e `feature/desconto-vip` alteram
#   a MESMA linha do arquivo `desconto-conflito.js` de formas diferentes.
#   Faça o merge de `feature/desconto-vip` em `main`, resolva o conflito
#   manualmente (combinando a intenção dos dois lados, sem apagar nenhuma
#   regra de negócio) e finalize o merge com um commit.
#
# Rode com: bash 02-git-cenarios.desafio.sh
# (o script só MONTA o cenário — as 3 tarefas você executa manualmente
# com comandos git, dentro do diretório impresso ao final)

set -euo pipefail

REPO="/tmp/estudo-git-desafio-$$"
rm -rf "$REPO"
mkdir -p "$REPO"
cd "$REPO"

git init -q
git config user.email "estudo@exemplo.com"
git config user.name "Estudo Node"

echo "function calcularDesconto(valor) { return valor * 0.9; }" > desconto.js
git add desconto.js && git commit -q -m "feat: implementa calculo de desconto"

echo "// wip 1" >> desconto.js
git add desconto.js && git commit -q -m "wip: ajustando arredondamento"

echo "// wip 2" >> desconto.js
git add desconto.js && git commit -q -m "wip: mais um ajuste"

echo "// wip 3" >> desconto.js
git add desconto.js && git commit -q -m "wip: corrigindo edge case"

echo "// fix typo" >> desconto.js
git add desconto.js && git commit -q -m "fix typo"

MAIN_BRANCH=$(git symbolic-ref --short HEAD)
git branch release/v2.0

echo "function calcularDesconto(valor) { return valor * 0.85; }" > desconto.js
git add desconto.js && git commit -q -m "fix: corrige percentual de desconto incorreto (hotfix)"
HOTFIX_HASH=$(git rev-parse HEAD)

git checkout -q -b feature/desconto-vip "$MAIN_BRANCH"
echo "function calcularDesconto(valor) { return valor * 0.7; } // 30% para VIP" > desconto-conflito.js
git add desconto-conflito.js && git commit -q -m "feat: desconto especial para clientes VIP"

git checkout -q "$MAIN_BRANCH"
echo "function calcularDesconto(valor) { return Math.round(valor * 0.9 * 100) / 100; } // com arredondamento" > desconto-conflito.js
git add desconto-conflito.js && git commit -q -m "feat: arredonda o valor do desconto padrao"

echo "Repositório criado em: $REPO"
echo "Commit de hotfix (tarefa 2): $HOTFIX_HASH"
echo
echo "cd $REPO && git log --oneline --all --graph"
echo "Comece pela TAREFA 1 (git rebase -i HEAD~5, na branch $MAIN_BRANCH)"
