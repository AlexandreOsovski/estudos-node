# Explique com suas palavras — 9. Observabilidade

Sem gabarito de propósito. Responda por escrito antes de checar o README principal.

## 1. Logs estruturados com pino

**Explique:** Por que `console.log('Usuário 42 fez login')` é mais difícil de usar em produção do que `logger.info({ usuarioId: 42 }, 'Usuário fez login')`? O que "estruturado" permite fazer que texto livre não permite?

**Cenário:** Um desenvolvedor loga `logger.info({ senha: req.body.senha }, 'Tentativa de login')` "só para debugar rapidamente" e esquece de remover antes do deploy. Por que isso é potencialmente mais grave do que um `console.log` da mesma senha? O que `redact` resolveria aqui?

## 2. Métricas básicas com prom-client

**Explique:** O que é o "RED method" (Rate, Errors, Duration)? Por que um `Histogram` é preferível a simplesmente calcular a média de duração das requisições?

**Cenário:** Uma API tem 95% das requisições respondendo em 50ms e 5% travando em 4 segundos (problema de GC, por exemplo). Qual seria a média de latência aproximada? Por que essa média "esconderia" o problema real que os p95/p99 revelariam?

## 3. Monitoramento de erros com Sentry

**Explique:** Por que "capturar a exceção com Sentry" não substitui "tratar a exceção corretamente"? O que pode dar errado se um endpoint captura o erro no Sentry mas responde 200 para o cliente mesmo assim?

**Cenário:** Uma exceção não tratada (`uncaughtException`) é capturada pelo Sentry, mas o processo continua rodando normalmente depois (sem `process.exit()`). Por que isso é considerado arriscado, mesmo com o erro registrado e visível no dashboard?

## 4. Health Check endpoint

**Explique:** Por que um health check que só responde `{ api: 'ok' }` (sem checar banco/Redis de verdade) é perigoso? O que Kubernetes/Docker fazem com base na resposta desse endpoint?

**Cenário:** O Redis está fora do ar, mas o health check da API não checa o Redis — só responde "ok" porque a API em si está de pé. O orquestrador continua roteando tráfego para essa instância. O que acontece com os usuários que dependem de funcionalidades que usam cache?
