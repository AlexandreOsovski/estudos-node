# Explique com suas palavras — 10. Performance e Profiling

Sem gabarito de propósito. Responda por escrito antes de checar o README principal.

## 1. `node --inspect` + heap snapshot e memory leaks

**Explique:** Qual é o padrão clássico de memory leak em Node.js envolvendo arrays/Maps/Sets globais? Por que comparar DOIS heap snapshots (não apenas um) é a técnica certa para identificar um vazamento?

**Cenário:** Um array global recebe itens continuamente via `setInterval`, sem nunca remover os antigos. Se você tirasse apenas UM heap snapshot (em vez de dois para comparar), conseguiria identificar que existe um vazamento? O que o "Comparison" entre dois snapshots revela que um snapshot isolado não revela?

## 2. Teste de carga com autocannon

**Explique:** Por que olhar só a latência MÉDIA de uma API sob carga pode esconder um problema sério? O que os percentis p97.5/p99 representam que a média não representa?

**Cenário:** Uma rota que faz um cálculo pesado de forma SÍNCRONA (bloqueando o event loop) é testada com autocannon a 50 conexões simultâneas. Por que a latência de OUTRAS rotas da mesma API (que não fazem nada pesado) também piora durante esse teste, mesmo elas não tendo nenhum código lento?

## 3. Dicas práticas de performance

**Explique:** Por que `JSON.parse(JSON.stringify(obj))` é uma forma arriscada de clonar objetos profundamente? Quais tipos de dado ele corrompe silenciosamente?

**Cenário:** Um código faz uma busca de "esse ID está numa lista de 100.000 permitidos?" usando `Array.includes` dentro de uma rota chamada centenas de vezes por segundo. Por que trocar o array por um `Set` é uma das otimizações de maior impacto com menor esforço aqui? O que muda em termos de complexidade (O(n) vs O(1))?
