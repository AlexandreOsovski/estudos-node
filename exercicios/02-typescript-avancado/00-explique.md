# Explique com suas palavras — 2. TypeScript Avançado

Sem gabarito de propósito. Responda por escrito antes de checar o README principal.

## 1. Utility Types

**Explique:** Por que `Omit<T, K>` não avisa se você digitar uma chave `K` que não existe em `T` (ao contrário de `Pick`)? Que tipo de bug isso pode causar em produção?

**Cenário:**
```typescript
interface Usuario { id: number; nome: string; senha: string; }
type UsuarioSemSenha = Omit<Usuario, 'sennha'>; // typo proposital
```
Esse código compila? O que `UsuarioSemSenha` acaba contendo, na prática?

## 2. Generics com constraints (`extends`)

**Explique:** Qual é a diferença entre usar `any` e usar um generic com `K extends keyof T`? Em que momento (compile-time ou runtime) cada abordagem pega o erro de "campo errado"?

**Cenário:** Por que `RepositorioBase<T extends ComId>` consegue implementar `buscarPorId` de forma genérica e seguraem qualquer `T`, sem saber nada sobre `Produto`, `Usuario`, etc.?

## 3. Type Guards e Narrowing

**Explique:** Por que capturar erros com `unknown` (em vez de `any`) no `catch` é considerado a prática correta desde o TS 4.4+? Que atrito isso cria de propósito, e por que esse atrito é bom?

**Cenário:** Numa union discriminada (`Quadrado | Circulo`), o que acontece se você adicionar um terceiro tipo (`Triangulo`) à union mas esquecer de tratar esse caso num `switch` sem `default`? Como o TypeScript poderia te ajudar a pegar esse esquecimento (dica: exhaustiveness checking)?

## 4. Mapped Types e Template Literal Types

**Explique:** Como Mapped Types + Template Literal Types juntos permitem gerar um tipo como `EventMap` (`onCriado`, `onAtualizado`, ...) automaticamente a partir de uma union de strings, sem escrever cada chave manualmente?

**Cenário:** Se você adicionar `'arquivado'` à union `Evento`, o que acontece automaticamente com o tipo `EventMap`? E com o objeto `handlers` que implementa esse tipo — o TypeScript reclama de algo?

## 5. O operador `satisfies`

**Explique:** Qual problema o `satisfies` resolve que nem anotar o tipo explicitamente (`: Record<Cor, string>`) nem deixar sem anotação nenhuma resolvem sozinhos?

**Cenário:** Compare o tipo de `paletaAnotada.vermelho` (anotado com `: Record<Cor, string>`) com o tipo de `paletaPleno.vermelho` (usando `satisfies`). Por que essa diferença de tipo importa na prática (ex: autocomplete, integração com bibliotecas de tema/rotas)?
