# Explique com suas palavras — 8. Arquitetura e SOLID

Sem gabarito de propósito. Responda por escrito antes de checar o README principal.

## 1. Single Responsibility Principle (SRP)

**Explique:** O que significa, na prática, "uma classe deve ter um único motivo para mudar"? Como isso se relaciona diretamente com testabilidade?

**Cenário:** Uma classe `UsuarioServiceJunior` faz validação, persistência via SQL cru E envio de email, tudo dentro do mesmo método. Se a regra de validação de email mudar amanhã, quais partes do código você arrisca quebrar sem querer, comparado a uma versão com responsabilidades separadas?

## 2. Open/Closed Principle (OCP)

**Explique:** O que significa "aberto para extensão, fechado para modificação"? Por que um `if/else` (ou `switch`) gigante que cresce a cada nova regra de negócio viola esse princípio?

**Cenário:** Um sistema de descontos usa uma interface `CalculadoraDeDesconto` com uma implementação por tipo de promoção. Uma nova campanha de "Dia das Mães" precisa de uma regra de desconto diferente. Quais arquivos/classos JÁ EXISTENTES e testados precisam ser modificados para suportar essa nova campanha?

## 3. Dependency Inversion Principle (DIP)

**Explique:** Qual é a diferença entre "inversão de dependência" (o princípio) e "injeção de dependência" (a técnica)? Por que um `NotificacaoService` que depende diretamente de `new Nodemailer()` viola o DIP, mesmo funcionando perfeitamente?

**Cenário:** Amanhã a empresa decide trocar o provedor de SMS de Twilio para outro. Numa arquitetura que respeita o DIP (com uma interface `CanalDeNotificacao`), o que precisa mudar? E numa arquitetura sem DIP, onde o service instancia `new Twilio()` diretamente?

## 4. Clean Architecture

**Explique:** O que significa "a regra de dependência aponta sempre para dentro"? Por que a camada de Entidades não pode importar nada de Express, Prisma, ou qualquer framework?

**Cenário:** Você precisa reescrever a API inteira de Express para Fastify (outro framework HTTP). Numa arquitetura em camadas (Entidades → Casos de Uso → Adaptadores → Infraestrutura), quais camadas precisam mudar? A entidade `Pedido` e o caso de uso `CriarPedidoUseCase` são afetados?

## 5. Injeção de Dependência sem framework

**Explique:** Por que você não precisa de um framework de DI (InversifyJS, container do NestJS) para PRATICAR injeção de dependência? O que exatamente esses frameworks automatizam, e o que continua sendo responsabilidade sua mesmo usando um?

**Cenário:** Um `PedidoService` recebe um `Logger` via construtor. Em testes, você passa um logger "mudo" (`{ log: () => {} }`) em vez do `ConsoleLogger` real. Por que isso é possível SEM nenhuma biblioteca de mock, e por que essa flexibilidade é o ponto central de DI?
