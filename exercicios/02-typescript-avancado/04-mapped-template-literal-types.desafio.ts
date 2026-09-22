/*
DESAFIO — Mapped Types e Template Literal Types

1. Dada a interface `Produto` abaixo, crie o tipo `ProdutoOpcional` que
   torna TODOS os campos opcionais E aceita `null` (mapped type com o
   modifier `?` combinado com union a `| null`).

2. Dada a union de eventos:
     type EventoCarrinho = 'adicionado' | 'removido' | 'finalizado';
   use Template Literal Types para criar `NomeDeHandler` no formato
   `aoXxx` (ex: 'adicionado' -> 'aoAdicionado'), e o Mapped Type
   `HandlersDoCarrinho` que mapeia cada `NomeDeHandler` para `() => void`.

3. Implemente o objeto `handlers: HandlersDoCarrinho`, com um handler para
   cada evento, cada um logando uma mensagem apropriada.

Rode com: npx ts-node 04-mapped-template-literal-types.desafio.ts
*/

interface Produto {
  nome: string;
  preco: number;
}

// TODO 1
type ProdutoOpcional = {[Key in keyof Produto]?: Produto[Key] | null};

// TODO 2
type EventoCarrinho = 'adicionado' | 'removido' | 'finalizado';
type NomeDeHandler = `on${Capitalize<EventoCarrinho>}`; // troque por um template literal type
type HandlersDoCarrinho = {
  [Event in NomeDeHandler]: () => void;
}; // troque pelo mapped type correto

// TODO 3
const handlers: HandlersDoCarrinho = {
  onAdicionado: () => console.log('Produto Adicionado'),
  onRemovido: () => console.log('Produto Removido'),
  onFinalizado: () => console.log('Produto Finalizado')
};

const produtoForm: ProdutoOpcional = { nome: 'Mouse', preco: null } as ProdutoOpcional;
console.log(produtoForm);
