# Explique com suas palavras — 4. Padrões de Código Pleno/Sênior

Sem gabarito de propósito. Responda por escrito antes de checar o README principal.

## 1. Repository Pattern

**Explique:** Qual é o ganho real de introduzir uma interface `UsuarioRepository` entre o `UsuarioService` e o Prisma/banco de dados? Isso não é "complicar à toa" para um projeto pequeno?

**Cenário:** Você precisa escrever 10 testes para `UsuarioService`, cobrindo regras de negócio (validação de email, etc). Sem o Repository Pattern (com o service chamando o Prisma direto), o que seria necessário para cada teste rodar? Com o padrão, o que muda?

## 2. Tratamento de Erros: wrapper assíncrono + exception filter

**Explique:** Por que um `throw` dentro de uma rota `async` do Express (antes da v5) não é capturado automaticamente pelo `try/catch` do próprio Express? O que o `asyncHandler` resolve exatamente?

**Cenário:** Uma rota lança `ErroValidacao` (status 400) e outra lança um erro genérico do banco (sem `status` definido). Sem um middleware de erro centralizado, o que cada desenvolvedor teria que repetir em CADA rota? Com o middleware central, o que muda?

## 3. Cache Aside com Redis

**Explique:** O que é "cache stampede" e por que ele acontece especificamente quando uma chave POPULAR expira? Por que "vou invalidar manualmente sempre, não preciso de TTL" é uma promessa arriscada?

**Cenário:** Um produto tem seu preço atualizado no banco, mas o desenvolvedor esqueceu de invalidar a chave `produto:{id}` no Redis. Por quanto tempo o sistema vai servir o preço ERRADO para os usuários? O que limita esse tempo mesmo sem invalidação manual?

## 4. Design Patterns essenciais: Observer, Decorator, Singleton

**Explique:** Por que usar `EventEmitter` explicitamente (Observer) é melhor do que simplesmente chamar 3 funções em sequência dentro do controller, quando um pedido é criado? O que você ganha ao adicionar um 4º "observador" no futuro?

**Cenário:** Por que o Node.js "já resolve" boa parte do padrão Singleton sozinho, sem você precisar escrever uma classe com `getInstance()`? O que garante que dois `require('./mesmo-modulo')` em arquivos diferentes retornem a MESMA instância?
