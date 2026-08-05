# Explique com suas palavras — 3. Node.js Internals

Sem gabarito de propósito. Responda por escrito antes de checar o README principal.

## 1. Streams

**Explique:** Por que `pipeline()` é preferível a encadear `.pipe()` manualmente? O que especificamente `.pipe()` NÃO faz que causa vazamento de recursos?

**Cenário:** Um Transform Stream lança um erro no meio do processamento de um arquivo de 5GB conectado via `.pipe()` encadeado (sem `pipeline()`). O que acontece com os streams de origem e destino? Eles são fechados automaticamente?

## 2. Buffers

**Explique:** Por que `'é'.length` (string JS) e `Buffer.from('é').length` (Buffer) retornam valores diferentes? Em que situação real esse detalhe causa um bug de "contador de caracteres errado"?

**Cenário:** Um upload de arquivo valida "nome do campo tem no máximo 20 caracteres" usando `campo.length` de uma string JS. Um usuário chinês/japonês consegue burlar esse limite em bytes reais? Explique por quê.

## 3. Worker Threads

**Explique:** Por que rodar um cálculo pesado (ex: Fibonacci recursivo de 40) diretamente na thread principal trava o servidor inteiro, mas rodá-lo numa Worker Thread não? Qual é o custo de usar Worker Threads que não existe ao rodar direto?

**Cenário:** Por que Worker Threads são uma péssima escolha para "otimizar" uma chamada de rede (ex: uma query no banco) que já é assíncrona por natureza? O que aconteceria de errado (ou desperdiçado) se você tentasse?

## 4. Child Processes: `exec`, `spawn`, `fork`

**Explique:** Qual é a diferença fundamental entre `exec`, `spawn` e `fork`, e quando cada um é a escolha certa? Por que `exec` é perigoso quando o comando inclui input do usuário?

**Cenário:** Um endpoint recebe um parâmetro `pasta` do usuário e roda `exec(\`ls ${pasta}\`)`. Um atacante envia `pasta = ". ; rm -rf /"`. O que acontece, e como `spawn` com argumentos em array evitaria esse problema?

## 5. `Promise.allSettled`

**Explique:** Qual é a diferença de comportamento entre `Promise.all` e `Promise.allSettled` quando uma das promises falha? Em que tipo de operação de negócio `Promise.all` seria a escolha ERRADA?

**Cenário:** Um sistema precisa enviar notificação para 1000 usuários; 12 falham por email inválido. Se você tivesse usado `Promise.all` em vez de `Promise.allSettled`, o que aconteceria com as notificações dos outros 988 usuários que seriam enviadas com sucesso?
