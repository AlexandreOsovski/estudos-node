// EXEMPLO — Type Guards e Narrowing
// Rode com: npx ts-node 03-type-guards-narrowing.exemplo.ts

type Quadrado = { tipo: 'quadrado'; lado: number };
type Circulo = { tipo: 'circulo'; raio: number };
type Forma = Quadrado | Circulo;

function ehQuadrado(forma: Forma): forma is Quadrado {
  return forma.tipo === 'quadrado';
}

function calcularArea(forma: Forma): number {
  if (forma.tipo === 'quadrado') {
    return forma.lado ** 2;
  }
  return Math.PI * forma.raio ** 2;
}

class ErroValidacao extends Error {}
class ErroBancoDeDados extends Error {}

function tratarErro(erro: unknown): string {
  if (erro instanceof ErroValidacao) return `Erro de validação: ${erro.message}`;
  if (erro instanceof ErroBancoDeDados) return `Erro de banco: ${erro.message}`;
  if (typeof erro === 'string') return `Erro (string): ${erro}`;
  return 'Erro desconhecido';
}

console.log(ehQuadrado({ tipo: 'quadrado', lado: 4 }));
console.log(calcularArea({ tipo: 'quadrado', lado: 4 }));
console.log(calcularArea({ tipo: 'circulo', raio: 2 }));
console.log(tratarErro(new ErroValidacao('campo obrigatório')));
console.log(tratarErro('falha simples'));
