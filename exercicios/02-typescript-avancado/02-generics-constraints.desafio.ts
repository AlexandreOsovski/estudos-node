/*
DESAFIO — Generics com constraints

1. Implemente a função genérica:
     atualizarCampo<T, K extends keyof T>(obj: T, chave: K, valor: T[K]): T
   que retorna um NOVO objeto (sem mutar o original) com o campo `chave`
   atualizado para `valor`. O TypeScript deve IMPEDIR (erro de compilação)
   chamar essa função com uma chave que não existe em T, ou um valor de
   tipo incompatível com o campo.

2. Complete a classe genérica `RepositorioOrdenavel<T extends ComId>`, que
   além de `adicionar` / `buscarPorId` / `todos`, tem um método
     ordenarPor<K extends keyof T>(campo: K): T[]
   que retorna os itens ordenados pelo valor do campo informado (funciona
   para campos number ou string).

Rode com: npx ts-node 02-generics-constraints.desafio.ts
*/

function atualizarCampo<T, K extends keyof T>(obj: T, chave: K, valor: T[K]): T {
  // TODO
  return obj;
}

interface ComId {
  id: number;
}

class RepositorioOrdenavel<T extends ComId> {
  protected itens: T[] = [];

  adicionar(item: T): void {
    this.itens.push(item);
  }
  buscarPorId(id: number): T | undefined {
    return this.itens.find((item) => item.id === id);
  }
  todos(): T[] {
    return this.itens;
  }
  ordenarPor<K extends keyof T>(campo: K): T[] {
    // TODO
    return this.itens;
  }
}

interface Produto extends ComId {
  nome: string;
  preco: number;
}

const usuario = { nome: 'Ana', idade: 30 };
console.log(atualizarCampo(usuario, 'idade', 31));
// console.log(atualizarCampo(usuario, 'sobrenome', 'Silva')); // deve dar erro de compilação

const repo = new RepositorioOrdenavel<Produto>();
repo.adicionar({ id: 1, nome: 'Monitor', preco: 900 });
repo.adicionar({ id: 2, nome: 'Teclado', preco: 250 });
console.log(repo.ordenarPor('preco')); // esperado: Teclado (250) antes de Monitor (900)
