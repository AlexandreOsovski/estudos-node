// EXEMPLO — Mapped Types e Template Literal Types
// Rode com: npx ts-node 04-mapped-template-literal-types.exemplo.ts

interface Usuario {
  nome: string;
  idade: number;
  email: string;
}

type UsuarioReadonly = { readonly [K in keyof Usuario]: Usuario[K] };
type UsuarioFormulario = { [K in keyof Usuario]?: Usuario[K] | null };

type Evento = 'criado' | 'atualizado' | 'removido';
type NomeDeHandler = `on${Capitalize<Evento>}`;

type EventMap = {
  [E in NomeDeHandler]: () => void;
};

const handlers: EventMap = {
  onCriado: () => console.log('Recurso criado'),
  onAtualizado: () => console.log('Recurso atualizado'),
  onRemovido: () => console.log('Recurso removido'),
};

const usuarioForm: UsuarioFormulario = { nome: 'Ana', idade: null };

handlers.onCriado();
handlers.onAtualizado();
console.log(usuarioForm);
