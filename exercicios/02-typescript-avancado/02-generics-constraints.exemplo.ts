// EXEMPLO — Generics com constraints (extends)
// Rode com: npx ts-node 02-generics-constraints.exemplo.ts

function pegarPropriedade<T, K extends keyof T>(obj: T, chave: K): T[K] {
  return obj[chave];
}
const usuario = { nome: 'Ana', idade: 30 };
const nomeTipado = pegarPropriedade(usuario, 'nome'); // tipo inferido: string
// const erro = pegarPropriedade(usuario, 'sobrenome'); // erro em tempo de compilação

interface ComId {
  id: number;
}

class RepositorioBase<T extends ComId> {
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
}

interface Produto extends ComId {
  nome: string;
  preco: number;
}

class RepositorioProdutos extends RepositorioBase<Produto> {
  buscarMaisCaroQue(valor: number): Produto[] {
    return this.itens.filter((p) => p.preco > valor);
  }
}

const repo = new RepositorioProdutos();
repo.adicionar({ id: 1, nome: 'Teclado', preco: 250 });
repo.adicionar({ id: 2, nome: 'Monitor', preco: 900 });

console.log(nomeTipado);
console.log(repo.buscarPorId(1));
console.log(repo.buscarMaisCaroQue(300));
