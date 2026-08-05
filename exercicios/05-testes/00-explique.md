# Explique com suas palavras — 5. Testes

Sem gabarito de propósito. Responda por escrito antes de checar o README principal.

## 1. Teste unitário com Vitest mockando um repositório

**Explique:** Por que mockar o repositório (em vez de usar um banco real) faz o teste rodar em milissegundos? O que exatamente você está testando quando mocka a dependência — a lógica de negócio, ou a integração com o banco?

**Cenário:** Um teste usa `vi.fn().mockResolvedValue(...)` para simular `buscarPorId`. Se amanhã alguém mudar a assinatura real do método no banco (ex: adicionar um parâmetro obrigatório), o teste unitário vai pegar esse erro? Por quê?

## 2. Teste de integração com Supertest

**Explique:** Qual é a diferença entre o que um teste unitário verifica e o que um teste de integração verifica? Por que testes de integração são mais lentos, e por que isso é um trade-off aceitável?

**Cenário:** Um teste de integração usando Supertest sobe a aplicação Express real (sem mockar nada) e faz uma requisição HTTP de verdade contra ela. O que esse teste consegue pegar que um teste unitário do controller (mockando tudo) NÃO pegaria?

## 3. Property-Based Testing com fast-check

**Explique:** Qual é a diferença entre um teste tradicional ("para o input X, espero Y") e um teste property-based ("para QUALQUER input que satisfaça uma condição, a propriedade P deve se manter")? Por que property-based testing acha edge cases que humanos não pensariam em testar manualmente?

**Cenário:** Uma função `ehPositivo(n)` tem um bug sutil: trata `0` como positivo por engano. Um teste tradicional com exemplos fixos (`ehPositivo(5) === true`, `ehPositivo(-3) === false`) pegaria esse bug? E um teste property-based com `fc.integer()`? Explique a diferença, incluindo o conceito de *shrinking*.
