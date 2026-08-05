// EXEMPLO — O operador satisfies (TypeScript 4.9+)
// Rode com: npx ts-node 05-satisfies-operator.exemplo.ts

type Cor = 'vermelho' | 'verde' | 'azul';

const paletaAnotada: Record<Cor, string> = {
  vermelho: '#FF0000',
  verde: '#00FF00',
  azul: '#0000FF',
};
// paletaAnotada.vermelho tem tipo `string` genérico — perdemos o literal

const paletaPleno = {
  vermelho: '#FF0000',
  verde: '#00FF00',
  azul: '#0000FF',
} satisfies Record<Cor, string>;

// paletaPleno.vermelho tem tipo LITERAL '#FF0000' (não apenas `string`)
console.log(paletaPleno.vermelho.toUpperCase());
console.log(paletaPleno);

// Se houvesse um typo, o TypeScript acusaria erro imediatamente:
// const paletaComErro = {
//   vermelho: '#FF0000',
//   verde: '#00FF00',
//   azull: '#0000FF', // Object literal may only specify known properties
// } satisfies Record<Cor, string>;
