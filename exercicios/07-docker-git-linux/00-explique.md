# Explique com suas palavras — 7. Docker, Git e Linux

Sem gabarito de propósito. Responda por escrito antes de checar o README principal.

## 1. Docker: Multi-stage build

**Explique:** Por que uma imagem Docker de produção NÃO deveria conter as `devDependencies` nem o código TypeScript fonte não compilado? O que multi-stage build resolve que uma imagem de estágio único não resolve?

**Cenário:** Um `docker-compose.yml` usa `depends_on` simples (sem `condition: service_healthy`) entre a API e o Postgres. Ao rodar `docker compose up` pela primeira vez numa máquina limpa, o que pode dar errado, mesmo com o Postgres "startado" segundo o Docker?

## 2. Git: Rebase interativo, Cherry-pick e Conflitos

**Explique:** Qual é a regra de ouro sobre quando NUNCA usar `git rebase`? Por que rebasear uma branch que outras pessoas já puxaram (`git pull`) causa problemas generalizados para elas?

**Cenário:** Um hotfix crítico foi commitado direto na `main`, mas precisa estar também na branch `release/v2.3` (que está várias versões atrás e não deve receber o resto do histórico da main). Por que `git cherry-pick` é a ferramenta certa aqui, em vez de um merge completo da main na release?

## 3. Linux para Dev Back-end

**Explique:** Por que `set -euo pipefail` no topo de um script de deploy é considerado essencial, e não apenas um "extra de segurança"? O que acontece, passo a passo, se um script SEM essa linha tiver um erro no meio (ex: `npm run build` falhar)?

**Cenário:** Você recebe um alerta de "porta 3000 já em uso" ao tentar subir uma API. Quais dois comandos, em sequência, você usaria para descobrir QUAL processo está usando a porta e depois encerrá-lo? Por que `kill -9` direto (sem tentar um `kill` normal antes) pode ser uma prática arriscada em produção?
