# Explique com suas palavras — 1. Event Loop & Assincronismo

Sem gabarito de propósito. Depois de estudar e resolver os `.exemplo`/`.desafio` desta pasta, responda cada item por escrito (ou em voz alta, gravando-se) ANTES de checar a seção correspondente no README principal. Se travar em algum item, é sinal de que o conceito ainda não está sólido.

## 1. Fases do Event Loop

**Explique:** Por que "decorar as 6 fases" não é o que separa um Pleno de um Sênior nessa pergunta de entrevista? O que realmente importa acontecer entre cada fase (e entre cada callback)?

**Cenário:**
```javascript
setTimeout(() => console.log('A'), 0);
setImmediate(() => console.log('B'));
```
Rodado no escopo síncrono principal, a ordem entre A e B **não é garantida**. Por que, e o que mudaria se esse mesmo código estivesse dentro de um callback de `fs.readFile`?

## 2. Microtasks vs Macrotasks

**Explique:** O que significa "esvaziar a fila de microtasks" e por que uma cadeia de `.then()` recursivos mal escrita pode causar *starvation* de macrotasks (travar o event loop)?

**Cenário:**
```javascript
setTimeout(() => console.log('macrotask'), 0);
Promise.resolve().then(() => {
  console.log('microtask 1');
  Promise.resolve().then(() => console.log('microtask 2, criada dentro da microtask 1'));
});
```
Em que ordem essas 3 linhas imprimem, e por quê? O que aconteceria se, em vez de uma Promise dentro da outra, você tivesse um `while(true)` dentro do `.then()`?

## 3. `process.nextTick()` vs `setImmediate()`

**Explique:** Por que `process.nextTick()` "não é tecnicamente uma fase do loop"? Em que situação abusar de `process.nextTick()` pode causar *starvation* de I/O?

**Cenário:** Dentro de um callback de `fs.readFile`, por que `setImmediate()` sempre roda antes de `setTimeout(fn, 0)` — mas essa garantia NÃO existe se as duas chamadas estiverem no escopo síncrono principal do script?

## 4. Comportamento do `this`

**Explique:** Por que `setTimeout(objeto.metodo, 1000)` frequentemente quebra em código Júnior? Qual é a diferença fundamental entre como uma `function` normal e uma arrow function resolvem `this`?

**Cenário:**
```javascript
class Servico {
  constructor() { this.nome = 'API'; }
  logar() { console.log(this?.nome); }
}
const s = new Servico();
const fn = s.logar;
fn();
```
O que essa chamada imprime, e por quê? Cite duas formas diferentes de corrigir isso sem mudar a linha `fn()`.

## 5. Closures

**Explique:** Por que `var` dentro de um loop com `setTimeout` "vaza" o valor final da variável para todos os callbacks, enquanto `let` não? O que isso tem a ver com "ambiente léxico"?

**Cenário:** No padrão de função fábrica (`criarContaBancaria`), por que `conta.saldo` retorna `undefined` mesmo depois de depositar dinheiro? Isso é um bug ou uma feature? Justifique.

## 6. Optional Chaining (`?.`) e Nullish Coalescing (`??`)

**Explique:** Por que usar `||` para valores default é considerado uma armadilha comum em código "descuidado"? Dê um exemplo de valor de negócio legítimo que `||` trataria incorretamente.

**Cenário:** `pedido?.pagamento?.desconto ?? 0` — o que acontece se `desconto` for `0`? E se `pagamento` for `undefined`? Explique cada `?.`/`??` separadamente.

## 7. Debounce e Throttle

**Explique:** Debounce "atrasa e cancela", throttle "espaça". Dê um exemplo de UI onde usar o padrão errado (debounce onde deveria ser throttle, ou vice-versa) causaria um bug perceptível pelo usuário.

**Cenário:** Um campo de busca usa `throttle` em vez de `debounce` para disparar requisições enquanto o usuário digita. O que acontece na prática (rede, servidor, experiência do usuário)?
