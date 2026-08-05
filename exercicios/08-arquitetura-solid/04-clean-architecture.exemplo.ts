// EXEMPLO — Clean Architecture: conceitos e camadas
// Rode com: npx ts-node 04-clean-architecture.exemplo.ts

// === CAMADA: ENTIDADE (regra de negócio pura, zero dependência externa) ===
export class Pedido {
  private itens: { nome: string; preco: number }[] = [];

  adicionarItem(nome: string, preco: number): void {
    if (preco <= 0) throw new Error('Preço deve ser positivo');
    this.itens.push({ nome, preco });
  }

  calcularTotal(): number {
    return this.itens.reduce((soma, item) => soma + item.preco, 0);
  }
}

// === CAMADA: CASO DE USO (orquestra entidades + portas/interfaces) ===
export interface PedidoRepositoryPort {
  salvar(pedido: Pedido): Promise<void>;
}

export class CriarPedidoUseCase {
  constructor(private repo: PedidoRepositoryPort) {}

  async executar(itens: { nome: string; preco: number }[]): Promise<number> {
    const pedido = new Pedido();
    itens.forEach((item) => pedido.adicionarItem(item.nome, item.preco));
    await this.repo.salvar(pedido);
    return pedido.calcularTotal();
  }
}

// === CAMADA: ADAPTADOR (implementação concreta da porta, sabe de infra) ===
export class PedidoRepositoryEmMemoria implements PedidoRepositoryPort {
  async salvar(pedido: Pedido): Promise<void> {
    console.log('[INFRA] Pedido salvo. Total:', pedido.calcularTotal());
  }
}

// === CAMADA: INFRAESTRUTURA (o "detalhe" — Express, aqui simulado) ===
export async function controllerHttpSimulado() {
  const useCase = new CriarPedidoUseCase(new PedidoRepositoryEmMemoria());
  const total = await useCase.executar([
    { nome: 'Teclado', preco: 250 },
    { nome: 'Mouse', preco: 80 },
  ]);
  console.log('[HTTP] Resposta 201 — total do pedido:', total);
  return total;
}

if (require.main === module) {
  controllerHttpSimulado();
}

// A entidade `Pedido` não importa nada de Express/Prisma/HTTP — poderia
// ser reutilizada numa CLI, num worker de fila, ou num teste unitário
// puro, sem qualquer adaptação.
