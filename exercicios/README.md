# Exercícios — De Pleno para Pleno Sênior

Espelha o sumário do [README principal](./PRINCIPAL.md). Cada tópico tem uma pasta numerada com:

- `00-explique.md` — perguntas abertas + cenário prático por subtópico, sem gabarito. Para responder DEPOIS de estudar a seção, como revisão tipo entrevista/PR.
- `NN-nome.exemplo.*` — código pronto, igual ao do README (ou uma variação equivalente), para rodar e ver funcionando.
- `NN-nome.desafio.*` — enunciado + esqueleto com `TODO`s, sem gabarito, para você implementar sozinho.

Cada arquivo `.exemplo`/`.desafio` tem, no topo, o comando exato para rodá-lo (`node ...`, `npx ts-node ...`, `npx vitest run ...`) e as dependências a instalar via `npm install`.

| Pasta | Tópico do README |
|---|---|
| `01-event-loop/` | 1. JavaScript Runtime & Assincronismo |
| `02-typescript-avancado/` | 2. TypeScript Avançado |
| `03-node-internals/` | 3. Node.js Internals |
| `04-padroes-codigo/` | 4. Padrões de Código Pleno/Sênior |
| `05-testes/` | 5. Testes |
| `06-seguranca/` | 6. Segurança Essencial |
| `07-docker-git-linux/` | 7. Docker, Git e Linux |
| `08-arquitetura-solid/` | 8. Arquitetura e SOLID |
| `09-observabilidade/` | 9. Observabilidade |
| `10-performance/` | 10. Performance e Profiling |

## Como estudar

1. Rode o `.exemplo.*` do subtópico e confira se a saída bate com os comentários do arquivo.
2. Abra o `.desafio.*` correspondente e implemente os `TODO`s — os requisitos e o comportamento esperado estão no comentário do topo do arquivo.
3. Rode o desafio e confira a saída contra os comentários inline (ex: `// esperado: ...`).
4. Em `07-docker-git-linux/`, os desafios de Git/Linux são scripts que montam um cenário real (repositório git em `/tmp`, ou uma porta ocupada) — você pratica os comandos de verdade, não só lê.
5. Só depois de rodar o exemplo e resolver o desafio de TODOS os subtópicos do tópico, abra o `00-explique.md` e responda cada pergunta por escrito (ou em voz alta), sem consultar nada. Se travar em alguma resposta, é sinal de que o "porquê" ainda não está sólido — volte ao README principal antes de seguir para o próximo tópico.

Não há gabarito nos arquivos de desafio nem nos de explicação, de propósito — a ideia é forçar a implementação e a articulação própria antes de comparar com a seção correspondente do README principal.
